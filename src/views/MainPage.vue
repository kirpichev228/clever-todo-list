<template>
  <div class="wrapper">
    <CalendarComp
      @pickedDay="setCurrentDay"
      @click="setCurrentTasks"
      @windowActive="setWindowActive"
      v-bind:class="{
        'isActive': isWindowActive
      }"
    ></CalendarComp>
    <div class="underline" v-if="isWindowActive"></div>
    <div class="day-info" v-if="isWindowActive">
      <div class="day-tasks">
        <h2 class="heading">
          Tasks for
          {{ currentDay.day }}
          {{ currentDay.month }}
          {{ currentDay.year }}
        </h2>
        <ul class="tasks-list" v-if="currentDay.tasks.length !== 0">
          <li class="task-item"
            v-for="task in currentDay.tasks" :key="task"
          >
            <CheckboxSample
              :labelFor="task.taskText"
              :isDone="task.isDone"
              @checkboxChange="(data) => changeTaskStatus(data, task.id)"
            >
              {{ task.taskText }}
            </CheckboxSample>
          </li>
        </ul>
        <span v-else> You have no tasks for this day </span>
      </div>
      <div class="task-buttons">
        <ButtonSample
          @click="
            $router.push(`/main/${currentDay.id}`);
            store.commit('calendar/setCurrentDate', currentDay)
            "
        >
          Manage Tasks
        </ButtonSample>
        <ButtonSample  @click="getTasks">
          Clear Tasks
        </ButtonSample>
        <ButtonSample
          @click="setWindowActive(false)"
        >
          Close
        </ButtonSample>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref as vueRef, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ref, onValue, set } from 'firebase/database';
import { realtimeDB } from '@/firebase/index';
import CalendarComp from '@/components/calendar/CalendarComp.vue';
import ButtonSample from '@/components/UI/ButtonSample.vue';
import CheckboxSample from '@/components/UI/CheckboxSample.vue';

const store = useStore();

const currentDay = vueRef({});
const isWindowActive = vueRef(false);
const taskList = vueRef([]);
const currentUserId = store.getters['auth/userID'];

const setCurrentDay = (data) => {
  currentDay.value = data;
};

const setWindowActive = (data) => {
  isWindowActive.value = data;
};

const setCurrentTasks = () => {
  currentDay.value.tasks = [...taskList.value]
    .filter((el) => el.date === currentDay.value.id);
  store.commit('calendar/setCurrentTasks', currentDay.value.tasks);
};

const getTasks = async () => {
  const taskListFromServer = ref(realtimeDB, `users/${currentUserId}`);
  onValue(taskListFromServer, (snapshot) => {
    if (snapshot.val() !== null) {
      taskList.value = Object.values(snapshot.val());
    }
  });
};

const changeTaskStatus = async (taskStatus, taskId) => {
  try {
    await set(ref(realtimeDB, `users/${currentUserId}/${taskId}/isDone`), taskStatus);
  } catch (error) {
    alert(error);
  }
};

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
