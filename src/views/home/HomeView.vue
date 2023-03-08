<template>
  <div class="home">
    <v-btn elevation="3" raised x-large @click="test">测试chatgpt</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { openai, sendMessage } from "@/bot/chatgpt/main";

@Component({
  components: {},
})
export default class Home extends Vue {
  async test() {
    console.log("openai:", openai);
    // let listmodels = await openai.listModels();
    // console.log("listModels:", listmodels);
    const question: any = await sendMessage("hello");
    console.log("question:", question[0].message.content);
  }
}
</script>
<style lang="scss" scoped></style>
