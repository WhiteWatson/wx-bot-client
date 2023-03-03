<template>
  <div class="home">
    <button class="btn" @click="start">start</button>
    <img :src="CommonModule.loginQrcode" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { wxBot, wxBotInit } from "@/bot";
import { CommonModule } from "@/store/modules/common";

@Component({
  components: {},
})
export default class Home extends Vue {
  loginQrcodeImg = "";

  start() {
    wxBotInit();
    this.loginQrcodeImg = CommonModule.loginQrcode;
  }

  // beforeMount() {}
}
</script>
<style lang="scss" scoped>
.btn {
  margin: 30px;
  width: 100px;
  height: 50px;
  font-size: 20px;
}
</style>
