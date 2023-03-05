<template>
  <div class="home">
    <button class="btn" @click="start">start</button>
    <img class="qrcode" :src="loginQrcodeImg || 'https://phpimg.ziroom.com/276e0322-14f8-4f88-831a-9ae207e05ef5.png'" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { wxBot, wxBotInit } from "@/bot";

@Component({
  components: {},
})
export default class Home extends Vue {
  // loginQrcodeImg = "";

  start() {
    wxBotInit();
  }

  beforeMount() {
    // console.log(this.$store.state.loginQrcode);
  }

  get loginQrcodeImg() {
    return this.$store.state.loginQrcode;
  }
}
</script>
<style lang="scss" scoped>
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
