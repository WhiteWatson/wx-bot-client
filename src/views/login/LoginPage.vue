<template>
    <div class="login">
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
            <img
                v-if="loginQrcodeImg"
                class="qrcode pt-5"
                :src="loginQrcodeImg"
            />
        </transition>
        <transition
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutDown"
        >
            <div></div>
        </transition>
      </div>
      <!-- <v-btn elevation="3" raised x-large @click="loggedOut">登出</v-btn> -->
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue, Watch, Ref } from "vue-property-decorator";
  import { wxBot, wxBotInit } from "@/bot";
  import Typewriter from "@/components/common/TypeWriter.vue";
  
  @Component({
    components: {Typewriter},
  })
  export default class Login extends Vue {
    btnText = "";
    startLoading = false;
    tipsText = "Let me help you";

    @Ref() readonly typewriter!: any
  
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
            to: `hallo ${val.payload.name}`,
        });
        this.tipsText = `hallo ${val.payload.name}`;
      }
    }
  
    start() {
      this.startLoading = true;
      
      this.$nextTick(() => {
        this.typewriter.replaceText({
            from: this.tipsText,
            to: "Give me some time",
        });
        this.tipsText = "Give me some time";
      })
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
  
  .start {
    text-align: center;
  }
  
  .contents {
    min-height: 350px;
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
  