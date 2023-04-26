<template>
  <div class="cal-item">
    <div class="cal-date">
      <div class="cal-day">
        {{ props.day }}
      </div>
      <div class="cal-info">
        <div class="cal-month">
          {{ props.week }}
        </div>
        <div class="cal-week">
          {{ props.month }}
        </div>
      </div>
    </div>
    <div class="cal-tasks">
      <div v-if="taskPlanned" class="cal-planned"></div>
      <div v-if="taskDone" class="cal-done"></div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
// onMounted, watchEffect, computed,
} from 'vue';
// import store from '@/store';

const props = defineProps({
  day: Number,
  week: String,
  month: String,
  id: Number,
  taskDone: Boolean,
  taskPlanned: Boolean,
  obj: Array,
});

console.log(props.obj);

const taskPlanned = ref(false);
const taskDone = ref(false);

if (props.obj) {
  props.obj.forEach((el) => {
    if (el.isDone) {
      taskDone.value = true;
    } else {
      taskPlanned.value = true;
    }
  });
}
// const allTasks = computed(() => store.getters['calendar/allTasks']);

// const taskCheck = () => {
//   allTasks.value.forEach((el) => {
//     // console.log(1);
//     if (el.date === props.id) {
//       if (el.isDone === true) {
//         taskDone.value = true;
//       } else {
//         taskPlanned.value = true;
//       }
//     }
//   });
// };

// watchEffect(allTasks, taskCheck());

// onMounted(() => {
//   taskCheck();
// });

</script>

<style scoped>
.cal-item {
  width: 130px;
  height: 130px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
}

.cal-date {
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 80%;
}

.cal-day {
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cal-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.cal-item:hover {
  cursor: pointer;
  border-color: rgba(237,75,130,0.6);
  box-shadow: 0 0 6px rgba(237,75,130,0.6);
}

.cal-tasks {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.cal-planned {
  width: 10px;
  height: 10px;
  background: none;
  border: 1px solid var(--color-static);
  border-radius: 5px;
}

.cal-done {
  width: 10px;
  height: 10px;
  background: var(--color-static);
  border: 1px solid var(--color-static);
  border-radius: 5px;
}

.cal-item:hover .cal-day,
.cal-item:hover .cal-month,
.cal-item:hover .cal-week {
  color: rgba(237,75,130,0.6);
}

.cal-item:hover .cal-planned {
  border-color: var(--color-hover);
}

.cal-item:hover .cal-done {
  background: var(--color-hover);
  border-color: var(--color-hover);
}

.cal-planned {
  width: 10px;
  height: 10px;
  background: none;
  border: 1px solid var(--color-static);
  border-radius: 5px;
}

.cal-done {
  width: 10px;
  height: 10px;
  background: var(--color-static);
  border: 1px solid var(--color-static);
  border-radius: 5px;
}

</style>
