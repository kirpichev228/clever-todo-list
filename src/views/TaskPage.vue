<template>
  <ModalAdd
    v-if="modalState"
    @modalState="setModalState"
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
        :class="{ 'isEmpty': storeWatcher.length === 0 }">
        <h3 v-if="storeWatcher.length === 0">
          You have no tasks for today
        </h3>
        <ul v-else class="task-list">
          <li
            v-for="task in storeWatcher"
            :key="task.task"
            class="task-item"
          >
            <CheckboxSample :labelFor="task.task">
              {{ task }}
            </CheckboxSample>
            <div class="buttons-block">
              <DeleteIcon></DeleteIcon>
              <EditIcon></EditIcon>
            </div>
          </li>
        </ul>
      </div>
      <div class="tasks-buttons">
        <div class="task-managment-buttons">
          <ButtonSample @click="setModalState(true)">
            New Task
          </ButtonSample>
          <ButtonSample @click="clearTasks">
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
import { computed, ref } from 'vue';
import ButtonSample from '@/components/UI/ButtonSample.vue';
import ModalAdd from '@/components/ModalAdd.vue';
import CheckboxSample from '@/components/UI/CheckboxSample.vue';
import DeleteIcon from '@/icons/DeleteIcon.vue';
import EditIcon from '@/icons/EditIcon.vue';

const store = useStore();
const currentDate = store.getters['calendar/currentDate'];
const modalState = ref(false);

const storeWatcher = computed(() => store.getters['calendar/currentTasks']);

const setModalState = (data) => {
  modalState.value = data;
};

const clearTasks = () => {
  store.commit('calendar/clearTasks');
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
