import { setting as initialState } from '@/utils/constant';

interface settingState {
  singleChat: boolean;
  firstName: any[];
  vipRoom: any[];
  vipUser: any[];
  replayObj: any;
}

const setting = {
  namespaced: true,
  state: {
    ...initialState
  },
  getters: {
    getSetting(state: settingState) {
      return state;
    }
  },
  mutations: {
    INITDATE(state: settingState) {
      Object.assign(state, initialState)
    },
    SET_SINGLECHAT(state: settingState, singleChat: boolean) {
      state.singleChat = singleChat;
    },
    SET_FIRSTNAME(state: settingState, firstName: any[]) {
      state.firstName = firstName;
    },
    SET_REPLAYOBJ(state: settingState, replayObj: any) {
      state.replayObj = replayObj;
    },
    SET_VIPROOM(state: settingState, vipRoom: any[]) {
      state.vipRoom = vipRoom;
    },
    SET_VIPUSER(state: settingState, vipUser: any[]) {
      state.vipUser = vipUser;
    },
  },
  actions: {},
  modules: {},
};

export default setting;
