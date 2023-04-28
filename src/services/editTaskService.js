import { ref, set } from 'firebase/database';
import store from '@/store';
import { realtimeDB } from '@/firebase/index';

export default async function editTaskService(userId, taskId, taskFormValue, taskArrIndex) {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await set(ref(realtimeDB, `users/${userId}/${taskId}/taskName`), taskFormValue.name);
    await set(ref(realtimeDB, `users/${userId}/${taskId}/taskDesc`), taskFormValue.desc);
    await set(ref(realtimeDB, `users/${userId}/${taskId}/date`), taskFormValue.date - 10800000);
    store.commit('calendar/editTask', {
      taskIndex: taskArrIndex,
      taskName: taskFormValue.name,
      taskDesc: taskFormValue.desc,
      taskDate: taskFormValue.date - 10800000,
    });
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('setErrorMessage', error);
    store.commit('setErrorToastStatus');
  }
}
