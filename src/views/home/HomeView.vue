<template>
  <div class="home">
    <h1>欢迎使用WxBotClient</h1>
    <h3>加群交流体验内测新功能</h3>
    <div class="img-box">
      <img class="group-img" src="@/assets/groupimg.jpg">
      <img class="gif-img" src="https://oss-chatgpt.oss-cn-beijing.aliyuncs.com/attr/model.gif">
    </div>
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
  }

  beforeMount() {
    // console.log("homepage beforMount");
  }
}
</script>
<style lang="scss" scoped>
.home {
  margin: 20px 70px;
}
.img-box {
  display: flex;
}
.group-img {
  height: 300px;
  margin-right: 20px;
}
.gif-img {
  margin: 15px 0;
}
</style>
