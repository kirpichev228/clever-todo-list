import { onValue } from 'firebase/database';
import tasksService from '@/services/tasksService';

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
    clearAllTasks(state) {
      state.allTasks = [];
      state.currentDate = {};
      state.currentTasks = [];
    },
    deleteTask(state, data) {
      state.currentTasks = state.currentTasks.filter((task) => task.id !== data);
    },
    editTask(state, data) {
      state.currentTasks[data.taskIndex].taskName = data.taskName;
      state.currentTasks[data.taskIndex].taskDesc = data.taskDesc;
      if (state.currentTasks[data.taskIndex].date !== data.taskDate) {
        state.currentTasks.splice(data.taskIndex, 1);
      }
    },
    changeLoaderStatus(state, status) {
      state.loaderStatus = status;
    },
    changeTaskStatus(state, data) {
      state.currentTasks[data.taskIndex].isDone = data.taskStatus;
    },
  },
  actions: {
    async getTasks({ commit }, userId) {
      const taskList = await tasksService.getTasks(userId);
      onValue(taskList, (snapshot) => {
        if (snapshot.val() !== null) {
          commit('setAllTasks', Object.values(snapshot.val()));
        }
      });
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
