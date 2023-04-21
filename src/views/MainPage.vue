<template>
  <div class="wrapper">
    <CalendarComp
      @pickedDay="setCurrentDay"
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
        <ul class="tasks-list">
          <li class="task-item">
            Task to pokakat'
          </li>
        </ul>
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
import { ref, onValue } from 'firebase/database';
import { realtimeDB } from '@/firebase/index';
import CalendarComp from '@/components/calendar/CalendarComp.vue';
import ButtonSample from '@/components/UI/ButtonSample.vue';

const store = useStore();

const currentDay = vueRef({});
const isWindowActive = vueRef(false);
const currentUserId = store.getters['auth/userID'];

const setCurrentDay = (data) => {
  currentDay.value = data;
};

const setWindowActive = (data) => {
  isWindowActive.value = data;
};

const getTasks = async () => {
  console.log(currentUserId);
  const taskList = ref(realtimeDB, `users/${currentUserId}`);
  onValue(taskList, (snapshot) => {
    console.log(snapshot.val());
  });
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
}

.heading {
  font-size: 40px;
}

.task-item {
  list-style: none;
  font-size: 20px;
  cursor: pointer;
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
