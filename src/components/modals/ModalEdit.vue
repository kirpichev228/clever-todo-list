<template>
  <div class="wrapper">
    <div class="modal-window">
      <form class="modal-form" @submit.prevent="editTask">
        <h2 class="modal-heading">
          Edit Task
        </h2>
        <InputSample
          :inputType="text"
          @inputVal="(value) => taskFormValue.name = value"
          :inputValue="currentTask.name"
          :length="20"
        >
          Task Name
        </InputSample>
        <InputSample
          :inputType="text"
          @inputVal="(value) => taskFormValue.desc = value"
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
              @change="taskFormValue.date = $event.target.valueAsNumber"
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
import editTaskService from '@/services/editTaskService';
import LoaderSample from '@/components/UI/LoaderSample.vue';
import VFocus from '@/directives/VFocus';
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

const taskFormValue = ref({
  name: props.currentTask.name,
  desc: props.currentTask.desc,
  date: props.currentTask.date,
});

const store = useStore();
const currentUserId = store.getters['auth/userID'];
const loaderObserver = computed(() => store.getters['calendar/loaderStatus']);

const editTask = async () => {
  editTaskService(
    currentUserId,
    props.currentTask.id,
    taskFormValue.value,
    props.currentTask.index,
  );
  emit('modalEditState', false);
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
