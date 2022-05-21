import { createStore } from 'vuex'
import { User } from '@/models'

export default createStore<{auth: boolean, user: User | undefined}>({
  state: {
    auth: false,
    user: undefined
  },
  getters: {
    isAuthenticated: state => state.auth,
    getUser: state => state.user
  },
  mutations: {
    setAuth(state, auth: boolean) {
      state.auth = auth
    },
    setUser(state, user: User) {
      // const token = localStorage.getItem('token')
      // cosnt user = JSON.parse(atob(token.split('.')[1]))
      // if (!token) return

      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
