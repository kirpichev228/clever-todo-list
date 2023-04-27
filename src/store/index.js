import { createStore } from 'vuex';
import { authStore } from '@/store/authStore';
import { calendarStore } from '@/store/calendarStore';

export default createStore({
  state: {
    errorMessage: '',
    errorToastStatus: false,
  },
  mutations: {
    setErrorMessage(state, data) {
      state.errorMessage = data;
    },
    setErrorToastStatus(state) {
      state.errorToastStatus = true;
      setTimeout(() => {
        state.errorToastStatus = false;
      }, 5000);
    },
  },
  actions: {
    setErrorMessage({ commit }, data) {
      commit('setErrorMessage', data);
    },
    setErrorToastStatus({ commit }) {
      commit('setErrorToastStatus');
    },
  },
  getters: {
    errorMessage(state) {
      return state.errorMessage;
    },
    errorToastStatus(state) {
      return state.errorToastStatus;
    },
  },
  modules: {
    auth: authStore,
    calendar: calendarStore,
  },
});
