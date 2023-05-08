import store from '@/store';
import tasksService from '@/services/tasksService';

export async function useClearTasks(tasksToRemove, userId, db) {
  store.commit('calendar/changeLoaderStatus', true);

  const updates = tasksToRemove.reduce((acc, task) => {
    acc[`users/${userId}/${task.id}`] = null;
    return acc;
  }, {});

  try {
    await tasksService.clearTasks(db, updates);
    store.commit('calendar/clearTasks');
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('error/setErrorMessage', error);
    store.commit('error/setErrorToastStatus');
  }
}
