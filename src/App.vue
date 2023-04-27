<template>
    <div class="app-wrapper">
      <Navbar></Navbar>
      <TransitionGroup name="trans" tag="div">
        <ErrorToast v-if="errorToastStatus"/>
      </TransitionGroup>
      <router-view>

      </router-view>
    </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import Navbar from './components/NavBar.vue';
import ErrorToast from './components/UI/ErrorToast.vue';

const store = useStore();

const errorToastStatus = computed(() => store.getters.errorToastStatus);

onBeforeMount(() => {
  store.dispatch('auth/fetchUser');
  store.dispatch('auth/setUser');
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
    gap: 10px;
  }

  .trans-enter-active,
  .trans-leave-active {
    transition: all 0.5s ease;
  }
  .trans-enter-from,
  .trans-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

</style>
