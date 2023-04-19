<!-- eslint-disable vuejs-accessibility/mouse-events-have-key-events -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" :fill="fill" @mouseover="fill = 'rgba(237, 75, 130, 0.6)'" @mouseout="fill = 'rgba(255, 255, 255, 0.6)'" viewBox="0 0 64 64">
    <path d="m20 56 36-36L44 8 8 44v12h12zM12 40l12 12M36 16l12 12M20 56h36" />
  </svg>
</template>

<script setup>
import { ref } from 'vue';

const fill = ref('rgba(255, 255, 255, 0.6)');
</script>

<style scoped>
svg {
  cursor: pointer;
  transition: fill 0.1s ease;
}
</style>
