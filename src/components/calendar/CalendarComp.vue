<template>
  <div class="cal-wrapper" v-scroll ref="calendarRow">
    <div class="cal-row">
      <CalendarItem
        v-for="day in daysArray"
        :key="day.id"
        :dayData="day"
        :tasks="setDayTasks(day)"
        @click="
          $emit('pickedDay', day);
          $emit('windowActive', true)
        "
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

import store from '@/store';
import VScroll from '@/directives/VScroll';
import CalendarItem from '@/components/calendar/CalendarItem.vue';

const monthName = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const weekDayName = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

const daysArray = ref([]);
const calendarRow = ref(null);

const allTasks = computed(() => store.getters['calendar/allTasks']);

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let today = new Date(currentYear, currentMonth);

const setCalendar = () => {
  const numDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  for (let i = 0; i < numDays; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), 1);
    date.setDate(today.getDate() + i);
    daysArray.value.push({
      id: date.valueOf(),
      day: date.getDate(),
      week: weekDayName[date.getDay()],
      month: monthName[date.getMonth()],
      year: date.getFullYear(),
    });
  }
};

const setDayTasks = (day) => allTasks.value.filter((el) => el.date === day.id);

const nextMonth = () => {
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) {
    currentYear += 1;
  }
  today = new Date(currentYear, currentMonth);
  setCalendar();
};

const handleScroll = () => {
  const calendarRowEl = calendarRow.value;

  if (calendarRowEl.scrollLeft + calendarRowEl.offsetWidth >= calendarRowEl.scrollWidth) {
    nextMonth();
  }
};

onMounted(() => {
  setCalendar();

  const calendarRowEl = calendarRow.value;
  calendarRowEl.addEventListener('scroll', handleScroll);
});

</script>

<style scoped>
.cal-wrapper {
  overflow-x: scroll;
  margin-top: 30vh;
  display: flex;
  align-items: center;
}
.cal-wrapper::-webkit-scrollbar {
  display: none;
}
.cal-row {
  width: fit-content;
  padding: 0 30px;
  display: flex;
  flex-direction: row;
  gap: 40px;
}
</style>
