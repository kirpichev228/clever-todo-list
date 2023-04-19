<template>
  <div class="wrapper">
    <div class="modal-window">
      <form class="modal-form" @submit.prevent="addTask">
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
          <ButtonSample
            type="submit"
            @click="pushTask"
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
// import { ref } from 'vue';
import { getDatabase, ref, set } from 'firebase/database';
import { app, realtimeDB } from '@/firebase/index';
import ButtonSample from './UI/ButtonSample.vue';
import InputSample from './UI/InputSample.vue';
import { auth } from '@/firebase/index';
import VFocus from './directives/VFocus';

const emit = defineEmits(['modalState']);

// const taskForm = ref({
//   task: '',
//   isDone: false,
// });
const store = useStore();

// const setTask = (inputValue) => {
//   taskForm.value.task = inputValue;
//   // taskForm.value.isDone = false;
// };
console.log(auth.lastNotifiedUid);
const addTask = () => {
  // store.commit('calendar/addTask', taskForm.value);
  emit('modalState', false);
};

const text = 'kjhk';

const pushTask = async () => {
  try {
    await set(ref(realtimeDB, `users/${auth.lastNotifiedUid}/task`), {
      taskText: text,
      isDone: false,
      date: 25,
    });
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
