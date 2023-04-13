<template>
  <button>
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style scoped>
button {
  padding: 10px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: rgba(255, 255, 255, 0.6);
}

button:hover {
  cursor: pointer;
  border-color: rgba(237,75,130,0.6);
  color: rgba(237,75,130,0.6);
}
</style>
