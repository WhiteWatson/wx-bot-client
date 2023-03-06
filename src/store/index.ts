import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    loginQrcode: "",
    messageList: [],
  },
  getters: {},
  mutations: {
    SET_MESSAGELIST(state, messageList) {
      state.messageList = messageList;
    },
    SET_LOGGED_IN(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_LOGGEN_OUT(state) {
      state.userInfo = null;
    },
    SET_USERINFO(state, userInfo) {
      console.log("userInfo enter", userInfo);
      state.userInfo = userInfo;
    },
    SET_LOGINQRCODE(state, qrcode) {
      console.log("code enter", qrcode);
      state.loginQrcode = qrcode;
    },
  },
  actions: {},
  modules: {},
});
