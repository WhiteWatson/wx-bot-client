import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    loginQrcode: "",
  },
  getters: {},
  mutations: {
    SET_USERINFO(userInfo: any) {
      console.log("userInfo enter", userInfo);
      this.userInfo = userInfo;
    },
    SET_LOGINQRCODE(state: any, qrcode: any) {
      console.log("code enter", qrcode);
      state.loginQrcode = qrcode;
    },
  },
  actions: {},
  modules: {},
});
