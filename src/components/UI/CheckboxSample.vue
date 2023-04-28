<template>
  <label :for="labelFor" class="custom-checkbox">
    <div class="description">
      <slot name="description"></slot>
    </div>
    <div class="heading">
      <span>Task Name:</span>
      <slot name="heading"></slot>
    </div>
    <input
      type="checkbox"
      :name="labelFor"
      :id="labelFor"
      class="input"
      @change="$emit('checkboxChange', $event.target.checked)"
      :checked="isDone"
    >
    <span class="checkmark"></span>
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
  flex-direction: column-reverse;
  gap: 10px;
  overflow-wrap: anywhere;
  word-wrap: break-word;
}

.custom-checkbox:hover {
  color: var(--color-hover);
}

.custom-checkbox input[type="checkbox"] {
  display:none;
}
.checkmark {
  width: 28px;
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

.heading {
  font-weight: 900;
  margin-left: 50px;
  margin-top: -37px;
  display: flex;
  gap: 20px
}

.description {
  margin-left: 50px;
}
</style>
