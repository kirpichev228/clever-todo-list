<template>
  <div class="toastWrapper">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import store from '@/store';

const errorMessage = computed(() => store.getters['error/errorMessage']);

</script>

<style scoped>

.toastWrapper {
  width: 300px;
  min-height: 100px;
  border: 1px solid var(--color-static);
  background: var(--color-hover);
  position: absolute;
  bottom: 50px;
  right: 50px;
  color: var(--color-static);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

</style>
