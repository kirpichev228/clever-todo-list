export const calendarStore = {
  namespaced: true,
  state: {
    currentDate: {},
    currentTasks: [],
  },
  mutations: {
    setCurrentDate(state, data) {
      state.currentDate = data;
    },
    addTask(state, data) {
      state.currentTasks.push(data);
    },
    clearTasks(state) {
      state.currentTasks = [];
    },
  },
  actions: {
    setCurrentDate({ commit }, data) {
      commit('setCurrentDay', data);
    },
    addTask({ commit }, data) {
      commit('addTask', data);
    },
    clearTasks({ commit }) {
      commit('clearTasks');
    },
  },
  getters: {
    currentDate(state) {
      return state.currentDate;
    },
    currentTasks(state) {
      return state.currentTasks;
    },
  },
};
