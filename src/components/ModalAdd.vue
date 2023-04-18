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
import { ref } from 'vue';
import ButtonSample from './UI/ButtonSample.vue';
import InputSample from './UI/InputSample.vue';
import VFocus from './directives/VFocus';

const emit = defineEmits(['modalState']);

const taskForm = ref({
  task: '',
  isDone: false,
});
const store = useStore();

const setTask = (inputValue) => {
  taskForm.value.task = inputValue;
  // taskForm.value.isDone = false;
};

const addTask = () => {
  store.commit('calendar/addTask', taskForm.value);
  emit('modalState', false);
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
