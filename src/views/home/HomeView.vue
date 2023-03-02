<template>
  <div class="home">
    <button class="btn" @click="start">start</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { wxBot, wxBotInit } from "@/bot";

@Component({
  components: {},
})
export default class Home extends Vue {
  start() {
    wxBotInit();
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
</style>
