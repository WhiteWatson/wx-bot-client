import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "../views/layouts/Layout.vue";

import HomeView from "../views/home/HomeView.vue";
import LoginPage from "../views/login/LoginPage.vue";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/",
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
        path: "/setting",
        // component: HomeView,
        name: "设置",
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

export const routerMap = [
  { path: "/", component: Layout, name: "首页", isHidden: true },
  { path: "/login", component: LoginPage, name: "登录", isHidden: true },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
