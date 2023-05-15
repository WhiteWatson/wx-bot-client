interface UserState {
  userInfo: any;
  loginQrcode: string;
  messageList: any[];
  contactList: any[];
}

const user = {
  namespaced: true,
  state: {
    userInfo: null,
    loginQrcode: "",
    messageList: [],
    contactList: [],
  },
  getters: {},
  mutations: {
    SET_MESSAGELIST(state: UserState, messageList: any) {
      state.messageList = messageList;
    },
    SET_LOGGED_IN(state: UserState, userInfo: any) {
      state.userInfo = userInfo;
    },
    SET_LOGGEN_OUT(state: UserState) {
      state.userInfo = null;
    },
    SET_USERINFO(state: UserState, userInfo: any) {
      console.log("userInfo enter", userInfo);
      state.userInfo = userInfo;
    },
    SET_LOGINQRCODE(state: UserState, qrcode: any) {
      console.log("code enter", qrcode);
      state.loginQrcode = qrcode;
    },
    SET_CONTACTLIST(state: UserState, contactList: any) {
      state.contactList = contactList;
    },
  },
  actions: {},
  modules: {},
};

export default user;
