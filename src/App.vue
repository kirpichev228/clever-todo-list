<template>
    <div class="app-wrapper">
      <Navbar></Navbar>
      <router-view>

      </router-view>
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import Navbar from './components/NavBar.vue';

const store = useStore();

onBeforeMount(() => {
  store.dispatch('fetchUser');
});

</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    transition-duration: 0.3s;
    color: var(--color-static);
    font-family: 'Montserrat', sans-serif;
  }

  :root {
    --color-static: rgba(255, 255, 255, 0.6);
    --color-hover: rgba(237,75,130,0.6);
    --background-gradient: linear-gradient(339deg, rgba(139,124,152,1) 0%,
      rgba(108,79,125,1) 24%, rgba(36,4,82,1) 100%);
  }

  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  .app-wrapper {
    height: 100vh;
    background: var(--background-gradient);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

</style>
