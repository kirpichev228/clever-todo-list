export const calendarStore = {
  namespaced: true,
  state: {
    allTasks: [],
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
    setAllTasks(state, data) {
      state.allTasks = data;
    },
    addTask(state, data) {
      state.currentTasks.push(data);
    },
    clearTasks(state) {
      state.currentTasks = [];
    },
    deleteTask(state, data) {
      state.currentTasks = state.currentTasks.filter((task) => task.id !== data);
    },
    editTask(state, data) {
      state.currentTasks[data.taskIndex].taskName = data.taskName;
      state.currentTasks[data.taskIndex].taskDesc = data.taskDesc;
    },
    changeLoaderStatus(state, data) {
      state.loaderStatus = data;
    },
    changeTaskStatus(state, data) {
      state.currentTasks[data.taskIndex].isDone = data.taskStatus;
    },
  },
  actions: {
    setCurrentDate({ commit }, data) {
      commit('setCurrentDay', data);
    },
    setCurrentTasks({ commit }, data) {
      commit('setCurrentTasks', data);
    },
    setAllTasks({ commit }, data) {
      commit('setAllTasks', data);
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
    editTask({ commit }, data) {
      commit('editTask', data);
    },
    changeLoaderStatus({ commit }, data) {
      commit('changeLoaderStatus', data);
    },
    changeTaskStatus({ commit }, data) {
      commit('changeTaskStatus', data);
    },
  },
  getters: {
    currentDate(state) {
      return state.currentDate;
    },
    currentTasks(state) {
      return state.currentTasks;
    },
    allTasks(state) {
      return state.allTasks;
    },
    loaderStatus(state) {
      return state.loaderStatus;
    },
  },
};
