import { createStore } from "vuex";
import { auth, IAuth } from "./auth";

export interface IStore {
  sec: IAuth;
}

export default createStore<IStore>({
  state: {
    sec: auth.state,
  },
  getters: {
    sec: (state: IStore) => state.sec,
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
