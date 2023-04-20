<template>
  <nav class="navbar">
    <h1 class="heading">
      Clever ToDo
    </h1>
    <div class="nav-buttons" v-if="storeWatcher">
      <span class="current-user"> {{ storeWatcher.email }} </span>
      <ButtonSample
        @click="$store.dispatch('auth/logout')"
      >
        Log Out
      </ButtonSample>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ButtonSample from './UI/ButtonSample.vue';

const store = useStore();

const storeWatcher = computed(() => store.getters['auth/user']);

</script>

<style scoped>
  .navbar {
    padding: 0 60px;
    height: 8vh;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .heading {
    word-spacing: 8px;
    font-weight: 200;
    padding: 8px;
    border: 1px solid var(--color-static);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .heading:hover {
    cursor: default;
    border-radius: 20px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    color: #ed4b82;
    border-color: var(--color-hover);
    box-shadow: 1px 1px 3px var(--color-hover);
  }

  .nav-buttons {
    display: flex;
    align-items: center;
    gap: 20px;
  }
</style>
