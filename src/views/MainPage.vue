<template>
  <div class="wrapper" v-if="taskListObserver">
    <CalendarComp
      @pickedDay="setCurrentDay"
      @click="setCurrentTasks"
      @windowActive="setWindowActive"
      v-bind:class="{
        'isActive': isWindowActive
      }"
    />
    <div class="underline" v-if="isWindowActive"></div>
    <div class="day-info" v-if="isWindowActive">
      <div class="day-tasks">
        <h2 class="heading">
          Tasks for
          {{ currentDay.day }}
          {{ currentDay.month }}
          {{ currentDay.year }}
        </h2>
        <ul class="tasks-list" v-if="currentTasksObserver.length !== 0">
          <li class="task-item"
            v-for="(task, index) in currentTasksObserver" :key="task.id"
          >
            <CheckboxSample
              :labelFor="task.id"
              :isDone="task.isDone"
              @checkboxChange="(data) => useTaskStatus(data, task.id, index, currentUserId)"
            >
              <template #heading>
                {{ task.taskName }}
              </template>
              <template #description>
                {{ task.taskDesc }}
              </template>
            </CheckboxSample>
          </li>
        </ul>
        <span v-else> You have no tasks for this day </span>
      </div>
      <div class="task-buttons">
        <ButtonSample @click="redirectToDayPage">
          Manage Tasks
        </ButtonSample>
        <ButtonSample @click="useClearTasks(tasksToRemove(), currentUserId, realtimeDB)">
          Clear Tasks
        </ButtonSample>
        <ButtonSample @click="setWindowActive(false)">
          Close
        </ButtonSample>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { ref as firebaseRef, onValue } from 'firebase/database';
import { realtimeDB } from '@/firebase/index';
import router from '@/router';
import CalendarComp from '@/components/calendar/CalendarComp.vue';
import ButtonSample from '@/components/UI/ButtonSample.vue';
import CheckboxSample from '@/components/UI/CheckboxSample.vue';
import { useTaskStatus } from '@/composables/useTaskStatus';
import { useClearTasks } from '@/composables/useClearTasks';

const store = useStore();

const currentDay = ref({});
const isWindowActive = ref(false);

const currentUserId = store.getters['auth/userID'];

const taskListObserver = computed(() => store.getters['calendar/allTasks']);
const currentTasksObserver = computed(() => store.getters['calendar/currentTasks']);

const setCurrentDay = (data) => {
  currentDay.value = data;
};

const setWindowActive = (data) => {
  isWindowActive.value = data;
};

const setCurrentTasks = () => {
  store.commit('calendar/setCurrentTasks', taskListObserver.value.filter((el) => el.date === currentDay.value.id));
};

const getTasks = async () => {
  store.commit('calendar/changeLoaderStatus', true);
  const taskListFromServer = firebaseRef(realtimeDB, `users/${currentUserId}`);
  onValue(taskListFromServer, (snapshot) => {
    if (snapshot.val() !== null) {
      store.commit('calendar/setAllTasks', Object.values(snapshot.val()));
    }
  });
  store.commit('calendar/changeLoaderStatus', false);
};

const redirectToDayPage = () => {
  router.push(`/main/${currentDay.value.id}`);
  store.commit('calendar/setCurrentDate', currentDay);
};

const tasksToRemove = computed(
  () => taskListObserver.value.filter((task) => task.date === currentDay.value.id),
);

onMounted(() => {
  getTasks();
});

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: hidden;
}

.underline {
  height: 0;
  width: 100%;
  border: 1px solid var(--color-static);
}

.day-info {
  display: flex;
  justify-content: space-between;
}

.day-tasks {
  width: 70vw;
  height: 65vh;
  margin-left: 30px;
  border: 2px solid var(--color-static);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.day-tasks::-webkit-scrollbar {
  width: 7px;
}

.day-tasks::-webkit-scrollbar-track {
  background: none;
}

.day-tasks::-webkit-scrollbar-thumb {
  background: var(--color-static);
}

.day-tasks::-webkit-scrollbar-thumb:hover {
  background: var(--color-hover);
}

.heading {
  font-size: 40px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.task-item {
  width: 100%;
  list-style: none;
  font-size: 20px;
  display: flex;
  align-items: start;
  gap: 10px;
  word-wrap: break-word;
  border: 1px solid var(--color-static);
  padding: 10px;
  padding-right: 40px;
}

.task-item:hover {
  color: var(--color-hover);
}

.task-buttons {
  padding: 0 30px;
  width: 27vw;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.isActive {
  margin-top: 0;
}
</style>
