<template>
  <label>
    <slot></slot>
    <input
      required
      :type="props.type"
      :placeholder="props.placeholder"
      :maxlength="props.length"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    >
  </label>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: String,
  placeholder: String,
  length: String,

  modelValue: String,
});

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
