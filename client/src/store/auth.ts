import { Action, ActionContext } from "vuex";
import { User } from "@/models";
import AuthService from "@/services/auth.service";
import { IStore } from ".";

const user = JSON.parse(localStorage.getItem('user') as string);

export interface IAuth {
    auth: boolean;
    user: User | undefined;
}

export const auth = {
    namespaced: true,
    state: {
        auth: !!user,
        user: user,
    },
    actions: {
        async login({ commit }: ActionContext<IAuth, IStore>, payload: { email: string, password: string }): Promise<User | void> {
            const userResult = await AuthService.login(payload.email, payload.password)
            commit('loginSuccess', user);
            if (!userResult) {
                return commit('loginFailure')
            }
            commit('loginSuccess', user);
            return userResult;
        },
        async logout({ commit }: ActionContext<IAuth, IStore>): Promise<void> {
            await AuthService.logout();
            commit('logout');
        },
        async register({ commit }: ActionContext<IAuth, IStore>, user: User): Promise<Action<IStore, IAuth>> {
            const registerResult = await AuthService.register(user);
            if (registerResult) {
                commit('registerSuccess', user);
            } else {
                commit('registerFailure');
            }
            return registerResult.data
        }
    },
    mutations: {
        loginSuccess(state: IAuth, user: User) {
            state.auth = true;
            state.user = user;
        },
        loginFailure(state: IAuth) {
            state.auth = false;
            state.user = undefined;
        },
        logout(state: IAuth) {
            state.auth = false;
            state.user = undefined;
        },
        registerSuccess(state: IAuth) {
            state.auth = false;
        },
        registerFailure(state: IAuth) {
            state.auth = false;
        }
    }
}