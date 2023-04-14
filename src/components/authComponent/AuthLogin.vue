<template>
  <div class="auth-wrapper">
    <h2>Log In</h2>
    <div class="inputs-field">
      <form class="form" @submit.prevent="login">
        <InputSample
          inputType="email"
          v-model="loginForm.email"
        >
          Email
        </InputSample>
        <InputSample
          inputType="password"
          v-model="loginForm.password"
        >
          Password
        </InputSample>
        <ButtonSample type="submit">
          Log In
        </ButtonSample>
      </form>
    </div>
    <p>
      Have no account?
      <router-link class="link" to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import ButtonSample from '../UI/ButtonSample.vue';
import InputSample from '../UI/InputSample.vue';

const loginForm = ref({});
const store = useStore();

const login = () => {
  store.dispatch('login', loginForm.value);
};

</script>

<style scoped>
.auth-wrapper {
  margin: auto;
  padding: 10px;
  width: 600px;
  height: 280px;
  border: 2px solid var(--color-static);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.inputs-field {
  height: 80%;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  height: 100%;
}

.link:hover {
  color: var(--color-hover);
}

</style>
