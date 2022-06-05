import { ActionContext } from "vuex";
import { User } from "@/models";
import * as Auth from "@/services/auth.service";
import { IStore } from ".";

export interface IAuth {
  auth: boolean;
  user: User | undefined;
}
export const auth = {
  namespaced: true,
  state: {
    auth: false,
    user: undefined,
  },
  actions: {
    async login(
      { commit }: ActionContext<IAuth, IStore>,
      payload: { email: string; password: string }
    ) {
      const loginResult = await Auth.login(payload.email, payload.password);
      commit("login", loginResult);
      return loginResult;
    },
    async logout({ commit }: ActionContext<IAuth, IStore>): Promise<void> {
      await Auth.logout();
      commit("logout");
    },
    async register(
      { commit }: ActionContext<IAuth, IStore>,
      user: { email: string; password: string; last: string; first: string }
    ) {
      const registerResult = await Auth.register(user);
      commit("register", registerResult);
      return registerResult;
    },
  },
  mutations: {
    login(state: IAuth, user: User) {
      state.auth = !!user;
      state.user = user;
    },
    logout(state: IAuth) {
      state.auth = false;
      state.user = undefined;
    },
    register(state: IAuth, user: User) {
      state.auth = !!user;
      state.user = user;
    },
  },
};
