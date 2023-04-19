<template>
  <div class="cal-wrapper" >
    <div class="cal-row">
      <CalendarItem
        v-for="day in daysArray" :key="day.id"
        :day="day.day"
        :week="day.week"
        :month="day.month"
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
  </div>
</template>

<script setup>
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
      year: date.getFullYear(),
    });
  }
};

arrPush(30);

</script>

<style scoped>
.cal-wrapper {
  overflow-x: scroll;
  margin-top: 30vh;
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
