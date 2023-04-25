import { ref, update } from 'firebase/database';
import store from '@/store';

export async function useClearTasks(tasksToRemove, userId, db) {
  store.commit('calendar/changeLoaderStatus', true);

  const updates = tasksToRemove.reduce((acc, task) => {
    acc[`users/${userId}/${task.id}`] = null;
    return acc;
  }, {});

  try {
    await update(ref(db), updates);
    store.commit('calendar/clearTasks');
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    alert(error);
  }
}
