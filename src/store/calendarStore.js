export const calendarStore = {
  namespaced: true,
  state: {
    currentDate: {},
    currentTasks: [],
    loaderStatus: false,
  },
  mutations: {
    setCurrentDate(state, data) {
      state.currentDate = data;
    },
    setCurrentTasks(state, data) {
      state.currentTasks = data;
    },
    addTask(state, data) {
      state.currentTasks.push(data);
    },
    clearTasks(state) {
      state.currentTasks = [];
    },
    deleteTask(state, data) {
      state.currentTasks = state.currentTasks.filter((task) => task.id !== data);
      console.log(state.currentTasks);
    },
    editTask(state, data, index) {
      state.currentTasks[index].taskText = data;
    },
    changeLoaderStatus(state, data) {
      state.loaderStatus = data;
    },
  },
  actions: {
    setCurrentDate({ commit }, data) {
      commit('setCurrentDay', data);
    },
    setCurrentTasks({ commit }, data) {
      commit('setCurrentTasks', data);
    },
    addTask({ commit }, data) {
      commit('addTask', data);
    },
    clearTasks({ commit }) {
      commit('clearTasks');
    },
    deleteTask({ commit }, data) {
      commit('deleteTask', data);
    },
    editTask({ commit }, data, index) {
      commit('editTask', data, index);
    },
    changeLoaderStatus({ commit }, data) {
      commit('changeLoaderStatus', data);
    },
  },
  getters: {
    currentDate(state) {
      return state.currentDate;
    },
    currentTasks(state) {
      return state.currentTasks;
    },
    loaderStatus(state) {
      return state.loaderStatus;
    },
  },
};
