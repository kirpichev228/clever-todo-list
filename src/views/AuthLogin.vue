<template>
  <div class="auth-wrapper">
    <h2>Log In</h2>
    <div class="inputs-field">
      <form class="form" @submit.prevent="login">
        <InputSample
          type="email"
          placeholder="Enter Email"
          v-model="loginForm.email"
          v-focus
        >
          Email
        </InputSample>
        <InputSample
          type="password"
          placeholder="Enter Password"
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
import { reactive } from 'vue';
import router from '@/router';
import VFocus from '@/directives/VFocus';
import ButtonSample from '../components/UI/ButtonSample.vue';
import InputSample from '../components/UI/InputSample.vue';

const loginForm = reactive({
  password: '',
  email: '',
});
const store = useStore();

const login = async () => {
  try {
    await store.dispatch('auth/login', loginForm);
    router.push('/');
  } catch (error) {
    store.commit('setErrorMessage', error);
    store.commit('setErrorToastStatus');
  }
};

</script>

<style scoped>
.auth-wrapper {
  margin: auto;
  padding: 10px;
  width: 600px;
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
