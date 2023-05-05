import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebase/index';
import router from '@/router';
import store from '.';

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

      try {
        const user = await authService.login(email, password);
        commit('setUser', user);
        commit('setID', auth.lastNotifiedUid);
        router.push('/');
      } catch (error) {
        store.commit('setErrorMessage', error, { root: true });
        store.commit('setErrorToastStatus', { root: true });
      }
    },

    async register({ commit }, details) {
      const { email, password } = details;

      try {
        const user = await authService.register(email, password);
        commit('setUser', user);
        commit('setID', auth.lastNotifiedUid);
        router.push('/');
      } catch (error) {
        store.commit('setErrorMessage', error, { root: true });
        store.commit('setErrorToastStatus', { root: true });
      }
    },

    async logout({ commit }) {
      try {
        await authService.logout();
        commit('clearUser');
        commit('clearID');
        router.push('/login');
      } catch (error) {
        store.commit('setErrorMessage', error, { root: true });
        store.commit('setErrorToastStatus', { root: true });
      }
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
