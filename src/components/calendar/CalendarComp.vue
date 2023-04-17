<template>
  <div class="cal-wrapper" >
    <div class="cal-row">
      <CalendarItem
        v-for="day in daysArray" :key="day.day"
        :day="day.day"
        :week="day.week"
        :month="day.month"
        @click="fetchData(day.id)"
      ></CalendarItem>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase/index';
import CalendarItem from '@/components/calendar/CalendarItem.vue';

const monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekDayName = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

const daysArray = [];
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const today = new Date(currentYear, currentMonth, 1);

const arrPush = () => {
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    daysArray.push({
      id: date[Symbol.toPrimitive]('number'),
      day: date.getDate(),
      week: weekDayName[date.getDay()],
      month: monthName[date.getMonth()],
    });
  }
};

const store = useStore();

const fetchData = async (day) => {
  console.log(store.getters['calendar/currentDay'], '4565');
  store.commit('calendar/setCurrentDay', 20);
  console.log(store.getters['calendar/currentDay'], '45');
  console.log(day);
  const dela = collection(db, 'day-task');
  try {
    const docSnap = await getDocs(dela);
    const filteredDela = docSnap.docs.map((dock) => ({ ...dock.data(), id: dock.id }));
    console.log(filteredDela);
  } catch (e) {
    console.log(e);
  }
};

arrPush(30);

</script>

<style scoped>
.cal-wrapper {
  overflow-x: scroll;
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
