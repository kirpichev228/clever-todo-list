<template>
  <div class="cal-item">
    <div class="cal-date">
      <div class="cal-day">
        {{ day }}
      </div>
      <div class="cal-info">
        <div class="cal-month">
          {{ week }}
        </div>
        <div class="cal-week">
          {{ month }}
        </div>
      </div>
    </div>
    <div class="cal-tasks">
      <div class="cal-planned"></div>
      <div class="cal-done"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  day: Number,
  week: String,
  month: String,
});

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
