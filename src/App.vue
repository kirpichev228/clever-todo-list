<template>
  <div class="app-wrapper">
    <Navbar></Navbar>
    <CalendarItem></CalendarItem>
  </div>
</template>

<script setup>
import Navbar from './components/NavBar.vue';
import CalendarItem from './components/calendar/CalendarItem.vue';

</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    transition-duration: 0.3s;
    color: rgba(255, 255, 255, 0.6);
    font-family: 'Montserrat', sans-serif;
  }

  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  .app-wrapper {
    height: 100vh;
    background: rgb(139,124,152);
    background: linear-gradient(339deg, rgba(139,124,152,1) 0%,
      rgba(108,79,125,1) 24%, rgba(36,4,82,1) 100%);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
