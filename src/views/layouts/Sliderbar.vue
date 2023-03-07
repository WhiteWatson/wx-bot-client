<template>
  <div class="slider-bar">
    <div class="slider-title pa-2 white--text text-h5">
      WxBotClient
    </div>
    <div class="menu-line ml-2 mt-2 mr-3 mb-0">基础 设置</div>
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

  .menu-line {
    font-size: 12px;
    color: rgb(231,227,252);

    &::before {
      content: '—— ';
    }

    &::after {
      content: ' ————';
    }
  }

  .menu {
    padding-top: 20px;
  }

  .menu-item {
    padding: 8px 0 8px 22px;
    margin: 0 12px 6px 0;
    border-radius: 0 25px 25px 0;

    &:hover {
      background: rgb(47, 43, 68);
    }
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

    .quan {
      border: 2px solid rgba($color: #fff, $alpha: 1);
    }
    
    .icon-right {
      color: #fff;
    }

    .menu-title {
      color: #fff;
    }
  }

  .quan {
    width: 12px;
    height: 12px;
    border: 2px solid rgba($color: #fff, $alpha: 0.6);
    border-radius: 50%;
    margin-right: 16px;
    transform: translateY(1px);
  }
  .icon-right {
    flex: 1;
    text-align: right;
    color: rgba($color: #fff, $alpha: 0.6);
  }
  .menu-title {
    font-size: 16px;
    line-height: 16px;
    color: rgba($color: #fff, $alpha: 0.6);
  }
}
</style>
