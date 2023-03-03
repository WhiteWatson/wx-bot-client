import store from "../";
import {
  VuexModule,
  Module,
  Mutation,
  getModule,
} from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "common" })
class Common extends VuexModule {
  userInfo = {};
  loginQrcode = "";

  @Mutation
  SET_USERINFO(userInfo: any) {
    this.userInfo = userInfo;
  }

  @Mutation
  SET_LOGINQRCODE(qrcode: any) {
    this.loginQrcode = qrcode;
  }
}

export const CommonModule = getModule(Common);
