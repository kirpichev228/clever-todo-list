import router from '@/router';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const authStore = {
  state: () => ({
    user: null,
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
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
      commit('SET_USER', auth.currentUser);
      router.push('/main');
    },

    async register({ commit }, details) {
      //
    },

    async logout({ commit }) {
      //
    },
  },
  namespaces: true,
};
