import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import LoginPage from "../views/login/LoginPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
