<template>
  <div class="wrapper">
    <div class="modal-window">
      <form class="modal-form" @submit.prevent="addNewTask">
        <h2 class="modal-heading">
          New Task
        </h2>
        <InputSample
          inputType="text"
          @inputVal="setTask"
          v-focus
        >
          Enter Task
        </InputSample>
        <div class="modal-buttons">
          <LoaderSample style="height: 1px; bottom:20px" v-if="loaderState"/>
          <ButtonSample
            type="submit"
          >
            Add Task
          </ButtonSample>
          <ButtonSample
            @click="$emit('modalState', false)"
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
import { ref as vueRef } from 'vue';
import { ref, set } from 'firebase/database';
import { realtimeDB } from '@/firebase/index';
import LoaderSample from '@/components/UI/LoaderSample.vue';
import ButtonSample from './UI/ButtonSample.vue';
import InputSample from './UI/InputSample.vue';
import VFocus from './directives/VFocus';

const emit = defineEmits(['modalState']);

const taskForm = vueRef('');
const store = useStore();
const loaderState = vueRef(false);
const currentUserId = store.getters['auth/userID'];
console.log(currentUserId);
const setTask = (inputValue) => {
  taskForm.value = inputValue;
};

const addNewTask = async () => {
  try {
    loaderState.value = true;
    await set(ref(realtimeDB, `users/${currentUserId}/${Date.now()}`), {
      taskText: taskForm.value,
      isDone: false,
      date: store.getters['calendar/currentDate'],
    });
    store.commit('calendar/addTask', taskForm.value);
    console.log(store.getters['calendar/currentTasks']);
    emit('modalState', false);
    loaderState.value = false;
  } catch (error) {
    console.log(error);
  }
};

</script>

<style scoped>
.wrapper {
  position: absolute;
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
