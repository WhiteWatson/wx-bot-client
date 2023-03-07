<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
};

export default {
  name: "TypeWriter",
  props: {
    /**
     *  Time to wait before typing first character (ms).
     */
    startDelay: {
      type: Number,
      default: 0,
    },
    /**
     * Interval between entering letters (ms).
     */
    typeInterval: {
      type: Number,
      default: 75,
    },
    /**
     * Array of objects with keys:
     *  - from - @type {String}  to be replaced (has to be present in currently displayed text),
     *  - to - @type {String} that will replace 'from' text
     */
    replace: {
      type: Array,
      default: () => [],
    },
    /**
     * Interval between replacing  in (ms).
     */
    replaceInterval: {
      type: Number,
      default: 2000,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const { innerHTML, innerText } = this.$el;
      this.$el.innerHTML =
        innerHTML.trim() === innerText
          ? `<span>${innerHTML}</span>`
          : innerHTML;
      await this.typewriter(this.$el.innerHTML);
      if (this.replace.length) {
        setTimeout(() => {
          this.startReplacing();
        }, this.replaceInterval);
      }
    },
    typewriter(str) {
      return new Promise((resolve) => {
        this.$el.innerHTML = "";
        const f = (index) => {
          const current = str[index];
          index = current === "<" ? str.indexOf(">", index) + 1 : ++index;
          this.$el.innerHTML = str.substr(0, index);
          if (index < str.length - 1) {
            setTimeout(f, this.typeInterval, index);
            return;
          }
          resolve();
        };
        f(0);
      });
    },
    removeString(start, end) {
      return new Promise((resolve) => {
        const elementCopy = this.$el;
        const f = (index) => {
          elementCopy.innerHTML = elementCopy.innerHTML.slice(0, index);
          index--;
          if (start <= index) {
            setTimeout(f, this.typeInterval, index);
            return;
          }
          resolve();
        };
        f(end - 1);
      });
    },
    addString(start, str) {
      return new Promise((resolve) => {
        const elementCopy = this.$el;
        const f = (index, start) => {
          elementCopy.innerHTML = this.insert(
            elementCopy.innerHTML,
            start,
            str[index]
          );
          if (index < str.length - 1) {
            setTimeout(f, this.typeInterval, ++index, ++start);
            return;
          }
          resolve();
        };
        f(0, start);
      });
    },
    insert(text, index, newChar) {
      return text.substring(0, index) + newChar + text.substr(index);
    },
    async replaceLastWord(to) {
      const lastWord = this.$el.innerText.split(" ").pop();
      assert(lastWord, "Component`s current innerHTML is empty");
      await this.replaceText({ from: lastWord, to });
    },
    async replaceText(changed) {
      assert(changed, "Changed parameter is needed");
      const { from, to } = changed;
      const str = this.$el.innerHTML;
      // const regex = new RegExp("\\" + from + "\\");
      // const regex = new RegExp(`\\b${from}\\b`);
      // console.log("regex", regex);
      // const match = str.match(regex);
      // assert(
      //   match,
      //   `Substring '${from}' not found in component\` current innerHTML`
      // );
      // const { index } = match;
      const index = str.indexOf(from);
      await this.removeString(index, index + from.length);
      await this.addString(index, to);
    },
    startReplacing(
      replace = this.replace,
      replaceInterval = this.replaceInterval
    ) {
      if (!replace) {
        throw new Error("Replace parameter is needed");
      }
      if (!replace) {
        throw new Error("Replace parameter has 0 length");
      }
      return new Promise((resolve) => {
        const func = async (index) => {
          await this.replaceText(replace[index]);
          if (index < replace.length - 1) {
            setTimeout(func, replaceInterval, ++index);
            return;
          }
          resolve();
        };
        func(0);
      });
    },
  },
};
</script>

<style scoped>
@keyframes blink {
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.content *:last-child::after {
  font-size: calc(1em + 2px);
  content: "|";
  animation: blink 0.75s step-end infinite;
}
</style>
