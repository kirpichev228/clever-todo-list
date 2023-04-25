<template>
  <ModalAdd
    v-if="modalState.add"
    @modalAddState="setModalAddState"
  />
  <ModalEdit
    v-if="modalState.edit"
    @modalEditState="setModalEditState"
    :currentTask="choosedTask.text"
    :currentId="choosedTask.id"
  />
  <div class="wrapper">
    <h2 class="heading">
      Task manager for
      {{ currentDate.day }}
      {{ currentDate.month }}
      {{ currentDate.year }}
    </h2>
    <div class="task-wrapper">
      <div
        class="tasks-block"
        :class="{ 'isEmpty': currentTasksObserver.length === 0 }">
        <h3 v-if="currentTasksObserver.length === 0">
          You have no tasks for today
        </h3>
        <ul v-else class="task-list">
          <li
            v-for="(task, index) in currentTasksObserver"
            :key="task.task"
            class="task-item"
          >
            <CheckboxSample
              :isDone="task.isDone"
              :labelFor="task.taskText"
              @checkboxChange="(data) => useTaskStatus(data, task.id, index, currentUserId)"
            >
              {{ task.taskText }}
            </CheckboxSample>
            <div class="buttons-block">
              <DeleteIcon @click="deleteTask(task)"></DeleteIcon>
              <EditIcon
                @click="editTask(index)"
              ></EditIcon>
            </div>
          </li>
        </ul>
      </div>
      <div class="tasks-buttons">
        <div class="task-managment-buttons">
          <ButtonSample @click="setModalAddState(true)">
            New Task
          </ButtonSample>
          <ButtonSample
            @click="useClearTasks(tasksToRemove, currentUserId, realtimeDB)"
          >
            Clear Tasks
          </ButtonSample>
        </div>
        <ButtonSample @click="$router.push('/main')">
          Back To Calendar
        </ButtonSample>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import {
  ref as firebaseRef, remove,
} from 'firebase/database';
import { realtimeDB } from '@/firebase/index';
import ButtonSample from '@/components/UI/ButtonSample.vue';
import ModalAdd from '@/components/modals/ModalAdd.vue';
import ModalEdit from '@/components/modals/ModalEdit.vue';
import CheckboxSample from '@/components/UI/CheckboxSample.vue';
import DeleteIcon from '@/icons/DeleteIcon.vue';
import EditIcon from '@/icons/EditIcon.vue';
import { useTaskStatus } from '@/composables/useTaskStatus';
import { useClearTasks } from '@/composables/useClearTasks';

const store = useStore();

const modalState = reactive({
  add: false,
  edit: false,
});
const choosedTask = reactive({
  text: '',
  id: NaN,
});

const currentDate = store.getters['calendar/currentDate'];
const currentUserId = store.getters['auth/userID'];

const taskListObserver = computed(() => store.getters['calendar/allTasks']);
const currentTasksObserver = computed(() => store.getters['calendar/currentTasks']);

const setModalAddState = (data) => {
  modalState.add = data;
};

const setModalEditState = (data) => {
  modalState.edit = data;
};

const tasksToRemove = taskListObserver.value.filter((task) => task.date === currentDate.id);

const deleteTask = async (task) => {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await remove(firebaseRef(realtimeDB, `users/${currentUserId}/${task.id}`));
    store.commit('calendar/deleteTask', task.id);
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    alert(error);
  }
};

const editTask = async (index) => {
  choosedTask.text = currentTasksObserver.value[index].taskText;
  choosedTask.id = currentTasksObserver.value[index].id;
  setModalEditState(true);
};
  // { date: 1680296400000,
// id: 1682324102438,
// isDone: true,
// taskText: 'Деланье делов' }

</script>

<style scoped>
.wrapper {
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.heading {
  font-size: 40px;
}

.task-wrapper {
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.tasks-block {
  width: 70%;
  border: 1px solid var(--color-static);
  padding: 10px;
  overflow-y: scroll;
}

.tasks-block::-webkit-scrollbar {
  width: 7px;
}

.tasks-block::-webkit-scrollbar-track {
  background: none;
}

.tasks-block::-webkit-scrollbar-thumb {
  background: var(--color-static);
}

.tasks-block::-webkit-scrollbar-thumb:hover {
  background: var(--color-hover);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;
}

.task-item {
  border: 1px solid var(--color-static);
  padding: 10px;
  word-wrap: break-word;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.input {
  margin-right: 20px;
}

.isEmpty {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tasks-buttons {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-managment-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.buttons-block {
  min-width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

</style>
