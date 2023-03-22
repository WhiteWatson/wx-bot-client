import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "../views/layouts/Layout.vue";

import HomeView from "../views/home/HomeView.vue";
import LoginPage from "../views/login/LoginPage.vue";
import GptSetting from "@/views/gptsetting/GptSetting.vue";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "控制台",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: HomeView,
        name: "登录页",
      },
      {
        path: "/chatgpt",
        component: GptSetting,
        name: "GPT设置",
      },
      // {
      //   path: "/setting",
      //   component: HomeView,
      //   name: "设置",
      // },
    ],
  },
  {
    path: "/",
    name: "login",
    component: LoginPage,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
