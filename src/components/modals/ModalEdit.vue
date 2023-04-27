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
          :inputValue="currentName"
        >
          Task Name
        </InputSample>
        <InputSample
          :inputType="text"
          @inputVal="setTaskDesc"
          :inputValue="currentDesc"
          v-focus
          >
          Task Description
        </InputSample>
        <div class="modal-buttons">
          <LoaderSample style="height: 1px; bottom:20px" v-if="loaderObserver"/>
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
  currentName: String,
  currentDesc: String,
  currentId: Number,
  currentIndex: Number,
});

const taskNameForm = ref(props.currentName);
const taskDescForm = ref(props.currentDesc);

const store = useStore();
const currentUserId = store.getters['auth/userID'];
const loaderObserver = computed(() => store.getters['calendar/loaderStatus']);

const setTaskName = (inputValue) => {
  taskNameForm.value = inputValue;
};

const setTaskDesc = (inputValue) => {
  taskDescForm.value = inputValue;
};

const editTask = async () => {
  try {
    store.commit('calendar/changeLoaderStatus', true);
    await set(firbaseRef(realtimeDB, `users/${currentUserId}/${props.currentId}/taskName`), taskNameForm.value);
    await set(firbaseRef(realtimeDB, `users/${currentUserId}/${props.currentId}/taskDesc`), taskDescForm.value);
    store.commit('calendar/editTask', {
      taskIndex: props.currentIndex,
      taskName: taskNameForm.value,
      taskDesc: taskDescForm.value,
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
