<template>
  <div class="home">
    <div class="text-h3">欢迎使用WxBotClient</div>
    <div class="text-body-1 mt-2">加群交流体验内测新功能，领取最新内测安装包自行制作微信AI助手！</div>
    <div class="text-body-1 mt-2">目前ChatGPT使用的ApiKey是作者私人的，用的人多可能会有些慢，如果不稳定请多多谅解，如果更改自己的APIKey可以在群里问群主或者去GitHub看文档自己修改哦~</div>
    <div class="text-body-1 mt-2">另外为了防止有人盗用ApiKey，我会不定时更新软件安装包，具体消息请加群了解</div>
    <div class="img-box">
      <img class="group-img" src="@/assets/groupimg.jpg">
      <img class="gif-img" src="https://oss-chatgpt.oss-cn-beijing.aliyuncs.com/attr/model.gif">
    </div>
    <v-btn
      elevation="2"
      @click="
        openExternal(
          'https://wx.zsxq.com/dweb2/index/group/51112142882244'
        )
      "
    >加入作者的星球了解更多AI知识</v-btn>
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

  openExternal(href: string) {
    (window as any).shell.openExternal(href);
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
  align-items: center;
}
.group-img {
  height: 300px;
  margin-right: 20px;
}
.gif-img {
  margin: 15px 0;
}
</style>
