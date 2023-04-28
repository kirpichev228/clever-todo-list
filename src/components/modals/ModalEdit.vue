<template>
  <div class="wrapper">
    <div class="modal-window">
      <form class="modal-form" @submit.prevent="editTask">
        <h2 class="modal-heading">
          Edit Task
        </h2>
        <InputSample
          :inputType="text"
          @inputVal="setTaskName"
          :inputValue="currentTask.name"
          :length="20"
        >
          Task Name
        </InputSample>
        <InputSample
          :inputType="text"
          @inputVal="setTaskDesc"
          :inputValue="currentTask.desc"
          v-focus
          >
          Task Description
        </InputSample>
        <div class="modal-buttons">
          <LoaderSample style="height: 1px; bottom:20px" v-if="loaderObserver"/>
          <label for="date" class="label">
            <input
              type="date"
              name="date"
              id="date"
              class="input"
              :valueAsNumber="currentTask.date + 86400000"
              @change="setTaskDate($event.target.valueAsNumber)"
            >
          </label>
          <ButtonSample
            type="submit"
          >
            Edit
          </ButtonSample>
          <ButtonSample
            @click="$emit('modalEditState', false)"
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
import { ref, computed } from 'vue';
import { ref as firbaseRef, set } from 'firebase/database';
import { realtimeDB } from '@/firebase/index';
import LoaderSample from '@/components/UI/LoaderSample.vue';
import VFocus from '@/components/directives/VFocus';
import ButtonSample from '@/components/UI/ButtonSample.vue';
import InputSample from '@/components/UI/InputSample.vue';

const emit = defineEmits(['modalEditState']);

const props = defineProps({
  currentTask: {
    name: String,
    desc: String,
    id: Number,
    index: Number,
    date: Number,
  },
});

const taskNameForm = ref(props.currentTask.name);
const taskDescForm = ref(props.currentTask.desc);
const taskDateForm = ref(props.currentTask.date);

const store = useStore();
const currentUserId = store.getters['auth/userID'];
const loaderObserver = computed(() => store.getters['calendar/loaderStatus']);

const setTaskName = (inputValue) => {
  taskNameForm.value = inputValue;
};

const setTaskDesc = (inputValue) => {
  taskDescForm.value = inputValue;
};

const setTaskDate = (inputValue) => {
  taskDateForm.value = inputValue - 10800000;
};

const editTask = async () => {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await set(firbaseRef(realtimeDB, `users/${currentUserId}/${props.currentTask.id}/taskName`), taskNameForm.value);
    await set(firbaseRef(realtimeDB, `users/${currentUserId}/${props.currentTask.id}/taskDesc`), taskDescForm.value);
    await set(firbaseRef(realtimeDB, `users/${currentUserId}/${props.currentTask.id}/date`), taskDateForm.value);
    store.commit('calendar/editTask', {
      taskIndex: props.currentTask.index,
      taskName: taskNameForm.value,
      taskDesc: taskDescForm.value,
      taskDate: taskDateForm.value,
    });
    emit('modalEditState', false);
    store.commit('calendar/changeLoaderStatus', false);
  } catch (error) {
    store.commit('setErrorMessage', error);
    store.commit('setErrorToastStatus');
  }
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

.label {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input {
  background: none;
  color: var(--color-static);
  outline: none;
  font-size: 20px;
  padding: 10px;
  border: 1px solid var(--color-static);
}

.modal-buttons {
  align-self: flex-end;
  display: flex;
  gap: 20px;
}
</style>
