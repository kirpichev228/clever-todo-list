export const errorStore = {
  namespaced: true,
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
  getters: {
    errorMessage(state) {
      return state.errorMessage;
    },
    errorToastStatus(state) {
      return state.errorToastStatus;
    },
  },
};
