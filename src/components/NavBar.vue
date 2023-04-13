<template>
  <nav class="navbar">
    <h1 class="heading">
      Clever ToDo
    </h1>
    <div class="nav-buttons">
      <span class="current-user">me@mail.ru</span>
      <ButtonSample>
        Sign Out
      </ButtonSample>
    </div>
  </nav>
</template>

<script setup>
import ButtonSample from './UI/ButtonSample.vue';

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
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .heading:hover {
    border-radius: 20px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    color: #ed4b82;
    border-color: rgba(237,75,130,0.6);
    box-shadow: 1px 1px 3px rgba(237,75,130,0.6);
  }

  .nav-buttons {
    display: flex;
    align-items: center;
    gap: 20px;
  }
</style>
