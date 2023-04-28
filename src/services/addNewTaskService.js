import { ref, set } from 'firebase/database';
import store from '@/store';
import { realtimeDB } from '@/firebase/index';

export default async function addNewTaskService(taskToPush, taskID, currentUserId) {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await set(ref(realtimeDB, `users/${currentUserId}/${taskID}`), taskToPush);
    store.commit('calendar/addTask', taskToPush);
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('setErrorMessage', error);
    store.commit('setErrorToastStatus');
  }
}
