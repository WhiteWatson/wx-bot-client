import { Vue } from "vue-property-decorator";
import { VNode } from "vue/types/vnode";
import { CreateElement, RenderContext } from "vue/types";

export type EnvTypes = "development" | "test" | "staging" | "production";
export type PlatformTypes = "wechatApp" | "wechat" | "app" | "browser";

export interface VueType {
  render?: (createElement: CreateElement, hack: RenderContext<any>) => VNode;
  beforeCreate?: (this: Vue) => void;
  created?: () => void;
  beforeDestroy?: () => void;
  destroyed?: () => void;
  beforeMount?: () => void;
  mounted?: () => void;
  beforeUpdate?: () => void;
  updated?: () => void;
  activated?: () => void;
  deactivated?: () => void;
  errorCaptured?: (err: Error, vm: Vue, info: string) => void;
}
