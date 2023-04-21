<template>
  <label :for="labelFor" class="custom-checkbox">
    <input
      type="checkbox"
      :name="labelFor"
      :id="labelFor"
      class="input"
      @change="$emit('checkboxChange', $event.target.checked)"
      :checked="isDone"
    >
    <span class="checkmark"></span>
    <slot></slot>
  </label>
</template>

<script setup>

defineProps({
  labelFor: String,
  isDone: Boolean,
});

</script>

<style scoped>
.custom-checkbox {
  cursor: pointer;
  display: flex;
  gap: 10px;
  overflow-wrap: anywhere;
}

.custom-checkbox input[type="checkbox"] {
  display:none;
}
.custom-checkbox .checkmark {
  position: relative;
  display: inline-block;
  min-width: 28px;
  height: 28px;
  border: 1px solid var(--color-static);
  background-color: none;
  margin-right: 10px;
}
.custom-checkbox:hover .checkmark,
.custom-checkbox input[type="checkbox"]:checked + .checkmark {
  background-color: none;
  border-color: var(--color-hover);
}
.custom-checkbox:hover .checkmark {
  border-color: var(--color-hover);
}
.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.custom-checkbox input[type="checkbox"]:checked + .checkmark:after {
  display: block;
  top: 4px;
  left: 9px;
  width: 6px;
  height: 12px;
  border: solid var(--color-hover);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
