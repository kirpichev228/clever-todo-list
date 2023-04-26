<template>
  <div class="cal-wrapper" v-scroll>
    <ButtonSample @click="prevMonth">Previous Month</ButtonSample>
    <div class="cal-row">
      <CalendarItem
        v-for="day in daysArray" :key="day.id"
        :id="day.id"
        :day="day.day"
        :week="day.week"
        :month="day.month"
        :obj="allTasks.filter((el) => el.date === day.id)"
        @click="
          $emit('pickedDay', {
            id: day.id,
            day: day.day,
            month: day.month,
            year: day.year
          });
          $emit('windowActive', true)"
      ></CalendarItem>
    </div>
    <ButtonSample @click="nextMonth">Next month</ButtonSample>

  </div>
</template>

<script setup>
import {
  ref, onMounted, computed, watchEffect,
} from 'vue';
import store from '@/store';
import VScroll from '@/components/directives/VScroll';
import CalendarItem from '@/components/calendar/CalendarItem.vue';
import ButtonSample from '../UI/ButtonSample.vue';

const monthName = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const weekDayName = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

const daysArray = ref([]);
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
      id: date[Symbol.toPrimitive]('number'),
      day: date.getDate(),
      week: weekDayName[date.getDay()],
      month: monthName[date.getMonth()],
      year: date.getFullYear(),
    });
  }
};

const nextMonth = () => {
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) {
    currentYear += 1;
  }
  today = new Date(currentYear, currentMonth);
  setCalendar();
};

const prevMonth = () => {
  daysArray.value = [];
  currentMonth = (currentMonth - 1 + 12) % 12;
  if (currentMonth === 11) {
    currentYear -= 1;
  }
  today = new Date(currentYear, currentMonth);
  setCalendar();
};

onMounted(() => {
  setCalendar();
  console.log(daysArray.value);
  console.log(allTasks);
});

watchEffect(allTasks, console.log('123'));

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
