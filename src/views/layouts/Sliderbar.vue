<template>
  <div class="slider-bar">
    <div class="menu">
      <div
        :class="['menu-item', { active: $route.path === item.path }]"
        v-for="item in items"
        :key="item.title"
      >
        <div :class="['menu-item__content']" @click="jump(item)">
          <div class="quan"></div>
          <div class="menu-title">{{ item.title }}</div>
          <div class="icon-right">
            <v-icon color="#bebebe" class="close"> mdi-chevron-right </v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { routes } from "@/router/index";

export default class Sliderbar extends Vue {
  get items() {
    let menuList: any = [];
    for (const key in routes) {
      if (Object.prototype.hasOwnProperty.call(routes, key)) {
        const element = routes[key];
        if (element.path === "/") {
          menuList = element.children?.map(
            (item: { name?: string; path: string }) => {
              return {
                title: item.name,
                path: item.path,
              };
            }
          );
        }
      }
    }
    return menuList;
  }
  jump(item: { name?: string; path: string }) {
    if (this.$route.path !== item.path) this.$router.push(item.path);
  }
}
</script>

<style lang="scss" scoped>
.slider-bar {
  min-height: 100vh;
  background: #28243d;

  .menu {
    padding-top: 20px;
  }

  .menu-item {
    padding: 8px 0 8px 22px;
    margin: 0 12px 6px 0;
    border-radius: 0 25px 25px 0;
  }

  .menu-item__content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .active {
    background: linear-gradient(
      -72.47deg,
      rgb(145, 85, 235) 22.16%,
      rgba(145, 85, 235, 0.7) 76.47%
    ) !important;
  }

  .quan {
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
    border-radius: 50%;
    margin-right: 8px;
    transform: translateY(1px);
  }
  .icon-right {
    flex: 1;
    text-align: right;
    color: #fff;
  }
  .menu-title {
    font-size: 16px;
    line-height: 16px;
    color: #fff;
  }
}
</style>
