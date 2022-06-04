import { createStore } from "vuex";
import { User } from "@/models";
import { auth, IAuth } from "./auth";

export interface IStore {
    sec: IAuth
}

export default createStore<{
    sec: { auth: boolean, user: User | undefined }
}>({
    state: {
        sec: auth.state
    },
    getters: {
        sec: (state: IStore) => state.sec
    },
    mutations: {},
    actions: {},
    modules: {
        auth
    },
});
