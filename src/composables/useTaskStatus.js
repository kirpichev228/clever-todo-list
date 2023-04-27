import { set, ref } from 'firebase/database';
import { realtimeDB } from '@/firebase';
import store from '@/store';

export async function useTaskStatus(taskStatus, taskId, taskIndex, userId) {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await set(ref(realtimeDB, `users/${userId}/${taskId}/isDone`), taskStatus);
    store.commit('calendar/changeTaskStatus', { taskStatus, taskIndex });
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('setErrorMessage', error);
    store.commit('setErrorToastStatus');
  }
}
