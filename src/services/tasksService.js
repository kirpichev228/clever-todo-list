import {
  ref,
  set,
  remove,
  update,
} from 'firebase/database';
import { realtimeDB } from '@/firebase/index';

class TasksService {
  async addNewTask(taskToPush, taskID, currentUserId) {
    await set(ref(realtimeDB, `users/${currentUserId}/${taskID}`), taskToPush);
  }

  async deleteTask(taskId, userId) {
    await remove(ref(realtimeDB, `users/${userId}/${taskId}`));
  }

  async editTask(userId, taskId, taskFormValue) {
    await set(ref(realtimeDB, `users/${userId}/${taskId}/taskName`), taskFormValue.name);
    await set(ref(realtimeDB, `users/${userId}/${taskId}/taskDesc`), taskFormValue.desc);
    await set(ref(realtimeDB, `users/${userId}/${taskId}/date`), taskFormValue.date - 10800000);
  }

  async clearTasks(database, updates) {
    await update(ref(database), updates);
  }

  async setTaskStatus(userId, taskId, taskStatus) {
    await set(ref(realtimeDB, `users/${userId}/${taskId}/isDone`), taskStatus);
  }
}

const tasksService = new TasksService();

export default tasksService;
