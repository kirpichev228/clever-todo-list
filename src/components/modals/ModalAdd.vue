<template>
  <div class="wrapper">
    <div class="modal-window">
      <form class="modal-form" @submit.prevent="addNewTask">
        <h2 class="modal-heading">
          New Task
        </h2>
        <InputSample
          placeholder="Enter Task Name"
          type="text"
          v-model="taskForm.name"
          length="20"
          v-focus
        >
          Task Name
        </InputSample>
        <InputSample
          type="text"
          placeholder="Enter Task Description"
          v-model="taskForm.desc"
        >
          Task Description
        </InputSample>
        <div class="modal-buttons">
          <LoaderSample style="height: 1px; bottom:20px" v-if="loaderObserver"/>
          <ButtonSample
            type="submit"
          >
            Add Task
          </ButtonSample>
          <ButtonSample
            @click="$emit('modalAddState', false)"
          >
            Cancel
          </ButtonSample>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import tasksService from '@/services/tasksService';
import LoaderSample from '@/components/UI/LoaderSample.vue';
import VFocus from '@/directives/VFocus';
import ButtonSample from '@/components/UI/ButtonSample.vue';
import InputSample from '@/components/UI/InputSample.vue';

const emit = defineEmits(['modalAddState']);

const taskForm = reactive({
  name: '',
  desc: '',
});

const store = useStore();

const currentUserId = store.getters['auth/userID'];
const loaderObserver = computed(() => store.getters['calendar/loaderStatus']);

const addNewTask = async () => {
  const taskID = Date.now();
  const taskToPush = {
    id: taskID,
    taskName: taskForm.name,
    taskDesc: taskForm.desc,
    isDone: false,
    date: store.getters['calendar/currentDate'].id,
  };
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await tasksService.addNewTask(taskToPush, taskID, currentUserId);
    store.commit('calendar/addTask', taskToPush);
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('error/setErrorMessage', error);
    store.commit('error/setErrorToastStatus');
  }
  emit('modalAddState', false);
};

</script>

<style scoped>
.wrapper {
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}

.modal-window {
  width: 60vw;
  padding: 20px;
  border: 1px solid var(--color-static);
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(0, 0, 0, 0.3);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-buttons {
  align-self: flex-end;
  display: flex;
  gap: 20px;
}
</style>
