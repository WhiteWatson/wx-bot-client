import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/main.scss";
import "animate.css";
import "@mdi/font/css/materialdesignicons.css";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
console.log("enter main.ts");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
