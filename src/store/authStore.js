import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebase/index';
import router from '@/router';

export const authStore = {
  state: {
    user: null,
    userID: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
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
        commit('SET_USER', auth.currentUser);
        commit('setID', auth.lastNotifiedUid);
        router.push('/main');
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User not found');
            break;
          case 'auth/wrong-password':
            alert('Wrong password');
            break;
          default:
            alert(error.message);
        }
      }
    },

    async register({ commit }, details) {
      const { email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        commit('SET_USER', auth.currentUser);
        commit('setID', auth.lastNotifiedUid);
        router.push('/main');
      } catch (error) {
        switch (error.code) {
          case 'auth/email-alredy-in-use':
            alert('Email already in use');
            break;
          case 'auth/invalid-email':
            alert('Invalid email');
            break;
          case 'auth/operation-not-allowed':
            alert('Operation not allowed');
            break;
          case 'auth/weak-password':
            alert('Weak password');
            break;
          default:
            alert(error.message);
        }
      }
    },

    async logout({ commit }) {
      await signOut(auth);
      commit('CLEAR_USER');
      commit('clearID');
      router.push('/login');
    },

    async fetchUser() {
      // auth.onAuthStateChanged(async (user) => {
      //   if (user === null) {
      //     commit('CLEAR_USER');
      //   } else {
      //     commit('SET_USER', user);

      //     if (router.isReady() && router.currentRoute.value.path === 'login') {
      //       router.push('/main');
      //     }
      //   }
      // });

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
          commit('CLEAR_USER');
          commit('clearID');
        } else {
          commit('SET_USER', user);
          commit('setID', user.uid);

          // if (router.isReady() && router.currentRoute.value.path === 'login') {
          //   router.push('/main');
          // }
        }
      });
    },
  },
  namespaced: true,
};
