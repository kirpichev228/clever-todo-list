import tasksService from '@/services/tasksService';
import store from '@/store';

export async function useTaskStatus(taskStatus, taskId, taskIndex, userId) {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await tasksService.setTaskStatus(userId, taskId, taskStatus);
    store.commit('calendar/changeTaskStatus', { taskStatus, taskIndex });
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('error/setErrorMessage', error);
    store.commit('error/setErrorToastStatus');
  }
}
