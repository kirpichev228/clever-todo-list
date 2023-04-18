<template>
  <label
    :for="inputType"
  >
    <slot></slot>
    <input
      :type="inputType"
      :name="inputType"
      :id="inputType"
      :placeholder="inputType"
      @change="$emit('inputVal', $event.target.value)"
    >
  </label>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  inputType: String,
});
defineEmits([
  'inputVal',
]);

</script>

<style scoped>
label {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
}

label:hover {
  cursor: pointer;
}

input {
  width: 80%;
  font-size: 20px;
  background: none;
  border: 1px solid var(--color-static);
  outline: none;
  padding: 10px 10px;
}

input:focus {
  border-color: var(--color-hover);
}
</style>
