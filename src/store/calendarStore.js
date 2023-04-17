export const calendarStore = {
  namespaced: true,
  state: {
    currentDay: 0,
    currentTask: '',
    isDone: false,
  },
  mutations: {
    setCurrentDay(state, day) {
      state.currentDay = day;
    },
    setCurrentTask(state, task) {
      state.currentTask = task;
    },
    setExecution(state, execution) {
      state.isDone = execution;
    },
  },
  actions: {
    setCurrentDay({ commit }, day) {
      commit('setCurrentDay', day);
    },
  },
  getters: {
    currentDay(state) {
      return state.currentDay;
    },
  },
};
