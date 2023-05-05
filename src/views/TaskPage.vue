<template>
  <ModalAdd
    v-if="modalState.add"
    @modalAddState="setModalAddState"
  />
  <ModalEdit
    v-if="modalState.edit"
    @modalEditState="setModalEditState"
    :currentTask="choosedTask"
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
        :class="{ 'isEmpty': isDayTasksListEmpty }">
        <h3 v-if="isDayTasksListEmpty">
          You have no tasks for this day
        </h3>
        <ul v-else class="task-list">
          <li
            v-for="(task, index) in currentTasksObserver"
            :key="task.task"
            class="task-item"
          >
            <CheckboxSample
              :isDone="task.isDone"
              :labelFor="task.taskName"
              @checkboxChange="(data) => useTaskStatus(data, task.id, index, currentUserId)"
            >
            <template #heading>
              {{ task.taskName }}
            </template>
            <template #description>
              {{ task.taskDesc }}
            </template>
            </CheckboxSample>
            <div class="buttons-block">
              <svg
                viewBox="0 0 1024 1024"
                width="25px"
                height="25px"
                class="trashIcon"
                @click="deleteTaskService(task.id, currentUserId)"
              >
                <use xlink:href="@/assets/icons/delete.svg#trashcan"></use>
              </svg>
              <svg
                viewBox="0 0 64 64"
                width="25px"
                height="25px"
                class="edit"
                @click="editTask(index)"
              >
                <use xlink:href="@/assets/icons/edit.svg#edit"></use>
              </svg>
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

import { realtimeDB } from '@/firebase/index';
import deleteTaskService from '@/services/deleteTaskService';

import ButtonSample from '@/components/UI/ButtonSample.vue';
import ModalAdd from '@/components/modals/ModalAdd.vue';
import ModalEdit from '@/components/modals/ModalEdit.vue';
import CheckboxSample from '@/components/UI/CheckboxSample.vue';

import { useTaskStatus } from '@/composables/useTaskStatus';
import { useClearTasks } from '@/composables/useClearTasks';

const store = useStore();

const modalState = reactive({
  add: false,
  edit: false,
});

const choosedTask = reactive({
  name: '',
  desc: '',
  id: NaN,
  date: NaN,
  index: NaN,
});

const currentDate = store.getters['calendar/currentDate'];
const currentUserId = store.getters['auth/userID'];

const taskListObserver = computed(() => store.getters['calendar/allTasks']);
const currentTasksObserver = computed(() => store.getters['calendar/currentTasks']);
const isDayTasksListEmpty = computed(() => currentTasksObserver.value.length === 0);

const setModalAddState = (data) => {
  modalState.add = data;
};

const setModalEditState = (data) => {
  modalState.edit = data;
};

const tasksToRemove = computed(
  () => taskListObserver.value.filter((task) => task.date === currentDate.id),
);

const editTask = (index) => {
  choosedTask.name = currentTasksObserver.value[index].taskName;
  choosedTask.desc = currentTasksObserver.value[index].taskDesc;
  choosedTask.id = currentTasksObserver.value[index].id;
  choosedTask.date = currentTasksObserver.value[index].date;
  choosedTask.index = index;
  setModalEditState(true);
};

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

.trashIcon,
.edit {
  fill: var(--color-static);
  transition-duration: 0s;
}

.trashIcon:hover,
.edit:hover {
  cursor: pointer;
  fill: var(--color-hover);
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
