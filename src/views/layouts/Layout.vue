<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app width="250">
      <Sliderbar></Sliderbar>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-btn elevation="2" icon @click="drawer = !drawer">-></v-btn>
      <v-toolbar-title>WxBot后台管理</v-toolbar-title>
    </v-app-bar>

    <v-main class="ma-0 pa-0">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sliderbar from "./Sliderbar.vue";

@Component({
  components: { Sliderbar },
})
export default class Layout extends Vue {
  drawer = true;
}
</script>
