<template>
  <label
    :for="setInputId"
  >
    <slot></slot>
    <input
      required
      :type="inputType"
      :name="setInputId"
      :id="setInputId"
      :placeholder="inputType"
      :maxlength="length"
      @change="$emit('inputVal', $event.target.value)"
      :value="inputValue"
    >
  </label>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  inputType: String,
  inputValue: String,
  length: Number,
});
defineEmits([
  'inputVal',
]);

const setInputId = new Date().getTime();

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
  width: 70%;
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
