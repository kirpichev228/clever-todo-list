import { auth } from '@/firebase/index';
import router from '@/router';
import AuthService from '@/services/authService';

const authService = new AuthService();

export const authStore = {
  state: {
    user: null,
    userID: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setID(state, id) {
      state.userID = id;
    },
    clearID(state) {
      state.userID = null;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    userID(state) {
      return state.userID;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      const user = await authService.login(email, password);
      commit('setUser', user);
      commit('setID', auth.lastNotifiedUid);
    },

    async register({ commit }, details) {
      const { email, password } = details;
      const user = await authService.register(email, password);
      commit('setUser', user);
      commit('setID', auth.lastNotifiedUid);
    },

    async logout({ commit }) {
      await authService.logout();
      commit('clearUser');
      commit('clearID');
    },

    async fetchUser() {
      return authService.fetchUser();
    },

    async setUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit('clearUser');
          commit('clearID');
        } else {
          commit('setUser', user);
          commit('setID', user.uid);
        }
      });
    },
  },
  namespaced: true,
};
