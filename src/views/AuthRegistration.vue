<template>
  <div class="auth-wrapper">
    <h2>Register</h2>
    <div class="inputs-field">
      <form class="form" @submit.prevent="register">
        <InputSample
          inputType="email"
          @inputVal="setMail"
          v-focus
        >
          Email
        </InputSample>
        <InputSample
          inputType="password"
          @inputVal="setPass"
        >
          Password
        </InputSample>
        <ButtonSample type="submit">
          Register
        </ButtonSample>
      </form>
    </div>
    <p>
      Already have an account?
      <router-link class="link" to="/login">Log In</router-link>
    </p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import VFocus from '@/directives/VFocus';
import ButtonSample from '../components/UI/ButtonSample.vue';
import InputSample from '../components/UI/InputSample.vue';

const registerForm = ref({});
const store = useStore();

const register = () => {
  store.dispatch('auth/register', registerForm.value);
};

const setPass = (inputValue) => {
  registerForm.value.password = inputValue;
};

const setMail = (inputValue) => {
  registerForm.value.email = inputValue;
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
