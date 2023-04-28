import { ref, remove } from 'firebase/database';
import store from '@/store';
import { realtimeDB } from '@/firebase/index';

export default async function deleteTaskService(taskId, userId) {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await remove(ref(realtimeDB, `users/${userId}/${taskId}`));
    store.commit('calendar/deleteTask', taskId);
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('setErrorMessage', error);
    store.commit('setErrorToastStatus');
  }
}
