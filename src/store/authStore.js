import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebase/index';
import router from '@/router';
import store from '.';

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
        await signInWithEmailAndPassword(auth, email, password);
        commit('setUser', auth.currentUser);
        commit('setID', auth.lastNotifiedUid);
        router.push('/main');
      } catch (error) {
        store.commit('setErrorMessage', error, { root: true });
        store.commit('setErrorToastStatus', { root: true });
      }
    },

    async register({ commit }, details) {
      const { email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        commit('setUser', auth.currentUser);
        commit('setID', auth.lastNotifiedUid);
        router.push('/main');
      } catch (error) {
        store.commit('setErrorMessage', error, { root: true });
        store.commit('setErrorToastStatus', { root: true });
      }
    },

    async logout({ commit }) {
      await signOut(auth);
      commit('clearUser');
      commit('clearID');
      router.push('/login');
    },

    async fetchUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            unsubscribe();
            resolve(user);
          },
          reject,
        );
      });
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
