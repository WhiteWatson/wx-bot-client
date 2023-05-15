import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/main.scss";
import "animate.css";
import 'element-ui/lib/theme-chalk/index.css';
import "@mdi/font/css/materialdesignicons.css";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ElementUI from 'element-ui';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
