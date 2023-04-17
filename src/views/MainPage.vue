<template>
  <div class="wrapper">
    <CalendarComp></CalendarComp>
    <div class="underline"></div>
    <div class="day-info">
      <div class="day-tasks">
        <h2 class="heading">
          Tasks
        </h2>
        <ul class="tasks-list">
          <li class="task-item">
            Task to pokakat'
          </li>
        </ul>
      </div>
      <div class="task-buttons">
        <ButtonSample>
          New Task
        </ButtonSample>
        <ButtonSample>
          Clear Tasks
        </ButtonSample>
      </div>
    </div>
  </div>

</template>

<script setup>
import CalendarComp from '@/components/calendar/CalendarComp.vue';
import ButtonSample from '@/components/UI/ButtonSample.vue';

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
</style>
