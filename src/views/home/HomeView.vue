<template>
  <div class="home">
    <header class="header">
      <div class="header-content">
        <div v-if="userInfo" class="name">{{ userInfo.payload.name }}</div>
        <div class="logout">
          <v-btn
            v-if="userInfo"
            class="ma-2"
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
        <div class="body-1 mt-3">你的傻瓜式微信AI管家sssss</div>
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
    <div class="content">
      <div
        v-if="welcomeText"
        class="steps-text"
        :style="{
          animation: `steps-width 2s steps(${welcomeText.length}) forwards`,
        }"
      >
        {{ welcomeText }}
      </div>
      <img
        class="qrcode pt-5"
        :src="
          loginQrcodeImg ||
          'https://phpimg.ziroom.com/276e0322-14f8-4f88-831a-9ae207e05ef5.png'
        "
        alt=""
      />
    </div>
    <v-btn elevation="3" raised x-large @click="loggedOut">登出</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { wxBot, wxBotInit } from "@/bot";

@Component({
  components: {},
})
export default class Home extends Vue {
  btnText = "";
  startLoading = false;
  welcomeText = "";

  @Watch("loginQrcodeImg")
  onLoginQrcodeImgChanged(val: string) {
    if (val) {
      this.startLoading = false;
      this.btnText = "刷新二维码";
    } else {
      this.btnText = "";
    }
  }

  @Watch("userInfo", { immediate: true, deep: true })
  onLoggedIn(val: any) {
    if (val) {
      this.startLoading = false;
      this.btnText = "登录成功";
      this.welcomeText = `您好${val.payload.name}，这里是微信AI管家`;
    }
  }

  start() {
    this.startLoading = true;
    wxBotInit();
  }

  loggedOut() {
    this.$store.commit("SET_LOGINQRCODE", "");
    wxBot.logout();
    wxBot.stop();
  }

  beforeMount() {
    // console.log(this.$store.state.loginQrcode);
  }

  get loginQrcodeImg() {
    return this.$store.state.loginQrcode;
  }

  get userInfo() {
    return this.$store.state.userInfo;
  }
}
</script>
<style lang="scss" scoped>
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

.start {
  text-align: center;
}

.content {
  max-width: 720px;
  margin: -80px auto;
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
</style>
