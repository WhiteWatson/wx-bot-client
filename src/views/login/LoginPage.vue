<template>
  <div class="login">
    <header class="header">
      <div class="header-content">
        <div v-if="userInfo" class="name"></div>
        <div class="logout">
          <v-btn
            v-if="userInfo"
            class="mt-3"
            text
            transition="fade-transition"
            color="white"
            @click="loggedOut"
            >退出登录</v-btn
          >
        </div>
      </div>
    </header>
    <div class="banner">
      <div class="title">
        <div class="text-h2">WxBotClient</div>
        <div class="body-1 mt-3">你的傻瓜式微信AI管家</div>
      </div>
      <div class="start my-6">
        <v-btn
          elevation="3"
          raised
          rounded
          x-large
          transition="scale-transition"
          :loading="startLoading"
          @click="start"
          >{{ btnText || "开始使用吧" }}
        </v-btn>
      </div>
      <svg
        class="banner-svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1920 323"
        enable-background="new 0 0 1920 323"
        xml:space="preserve"
      >
        <polygon
          fill="#ffffff"
          style="fill-opacity: 0.05"
          points="-0.5,322.5 -0.5,121.5 658.3,212.3 "
        ></polygon>
        <polygon
          fill="#ffffff"
          style="fill-opacity: 0.1"
          points="-2,323 1920,323 1920,-1 "
        ></polygon>
      </svg>
    </div>
    <div class="contents">
      <div class="bot-message pt-4">
        <div class="avatar mr-2">
          <v-avatar color="warning lighten-2" size="32">B</v-avatar>
        </div>
        <typewriter v-if="tipsText" ref="typewriter">
          <div class="tip-text">{{ tipsText }}</div>
        </typewriter>
      </div>
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <img v-if="loginQrcodeImg" class="qrcode pt-5" :src="loginQrcodeImg" />
      </transition>
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div></div>
      </transition>
    </div>
    <v-footer dark padless absolute>
      <v-card class="flex login-footer" color="#712cf9" flat tile>
        <v-card-text class="pb-0">
          <div class="subheading subtitle-1 text-center">
            此软件仅供学习使用，律师函警告 0.0
          </div>
        </v-card-text>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>WxBotClient</strong>
          <a
            class="github-link"
            @click="openExternal('https://github.com/LittleCCB/wx-bot-client')"
            href=""
            >GitHub</a
          >
        </v-card-text>
      </v-card>
    </v-footer>

    <v-dialog v-model="dialog" persistent class="v-dialog" width="500">
      <div class="dialog-content">
        <div class="dialog-title">~WOW~</div>
        <div class="dialog-desc">
          欢迎使用AI管家，AI管家使用ChatGPT，请为你的管家绑定ChatGPT API
          key，为了防止你的管家失联，请勿关闭此程序。
        </div>
        <div class="dialog-footer">
          <v-btn text @click="$router.push('/home')">
            去往管理页面(正在开发)
          </v-btn>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="welcomeDialog" persistent class="v-dialog" width="550">
      <div class="dialog-content">
        <div class="dialog-title">~Welcome~</div>
        <div class="dialog-desc">
          <span>加入项目交流群，催促作者开发新功能</span>
          <div class="img-box">
            <img class="group-img" src="@/assets/groupimg.jpg" />
            <img
              class="gif-img"
              src="https://oss-chatgpt.oss-cn-beijing.aliyuncs.com/attr/model.gif"
            />
          </div>
        </div>
        <div class="dialog-footer">
          <v-btn text @click="welcomeDialog = false"> 好的 </v-btn>
          <v-btn @click="openExternal('https://t.zsxq.com/0csDtcatf')">
            加入知识星球
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from "vue-property-decorator";
import { wxBot, wxBotInit } from "@/bot";
import Typewriter from "@/components/common/TypeWriter.vue";

@Component({
  components: { Typewriter },
})
export default class Login extends Vue {
  btnText = "";
  startLoading = false;
  tipsText = "Let me help you!";
  dialog = false;
  welcomeDialog = true;

  @Ref() readonly typewriter!: any;

  @Watch("loginQrcodeImg")
  onLoginQrcodeImgChanged(val: string) {
    if (val) {
      this.startLoading = false;
      this.btnText = "刷新二维码";
      this.typewriter.replaceText({
        from: this.tipsText,
        to: "I'm ready",
      });
      this.tipsText = "I'm ready";
    } else {
      this.btnText = "";
    }
  }

  @Watch("userInfo", { immediate: true, deep: true })
  onLoggedIn(val: any) {
    if (val) {
      this.startLoading = false;
      this.btnText = "登录成功";
      this.typewriter.replaceText({
        from: this.tipsText,
        to: `hallo${val.payload.name}， 请坐稳，准备起飞`,
      });
      this.tipsText = `hallo${val.payload.name}， 请坐稳，准备起飞`;
      setTimeout(() => {
        this.dialog = true;
      }, 3000);
    }
  }

  start() {
    this.startLoading = true;

    this.$nextTick(() => {
      this.typewriter.replaceText({
        from: this.tipsText,
        to: "就请你给我多一点点时间再多一点点时间...",
      });
      this.tipsText = "就请你给我多一点点时间再多一点点时间...";
    });
    wxBotInit();
  }

  loggedOut() {
    this.$store.commit("user/SET_LOGINQRCODE", "");
    wxBot.logout();
    wxBot.stop();
  }

  openExternal(href: string) {
    (window as any).shell.openExternal(href);
  }

  beforeMount() {
    // console.log("loginpage beforMount");
  }

  get loginQrcodeImg() {
    return this.$store.state.user.loginQrcode;
  }

  get userInfo() {
    return this.$store.state.user.userInfo;
  }
}
</script>
<style lang="scss" scoped>
.login {
  min-height: 100vh;
}
.header {
  max-height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;

  &-content {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}
.banner {
  min-height: 350px;
  background-image: linear-gradient(#712cf9, rgba(113, 44, 249, 0.95));
  position: relative;

  .title {
    padding-top: 60px;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);

    .text-h2 {
      font-weight: 400;
      color: #fff;
    }
  }

  .start {
    position: relative;
    z-index: 1;
  }

  &-svg {
    position: absolute;
    bottom: 0;
    z-index: 0;
  }
}

.bot-message {
  display: flex;
  justify-content: center;
  align-content: center;

  .avatar {
    color: #fff;
  }

  .tip-text {
    vertical-align: text-bottom;
  }
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

.start {
  text-align: center;
}

.contents {
  min-height: 250px;
  max-width: 720px;
  margin: -80px auto 0;
  position: relative;
  z-index: 1;
  background: #fff;
  border-radius: 5px;
  text-align: center;
}
.btn {
  margin: 30px;
  width: 100px;
  height: 50px;
  font-size: 20px;
}
.qrcode {
  width: 300px;
}

::v-deep(.v-dialog) {
  box-shadow: none;
}

.dialog-content {
  width: 100%;
  padding: 20px;
  display: flex;
  border-radius: 6px;
  flex-direction: column;
  background: #fff;
}
.dialog-title {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: rgba(58, 53, 65, 0.87);
  margin-bottom: 20px;
}
.dialog-desc {
  font-size: 14px;
  font-weight: 400;

  color: rgba(58, 53, 65, 0.87);
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
  ::v-deep(.v-btn__content) {
    color: rgb(145, 85, 253);
  }
}
.login-footer {
  width: 100%;
}

.github-link {
  color: #fff;
}
</style>
