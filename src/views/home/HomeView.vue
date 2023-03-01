<template>
  <div class="home">
    <button @click="start">start</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { botInit } from "@/bot/main";

@Component({
  components: {},
})
export default class Home extends Vue {
  start() {
    botInit();
  }
}
</script>
