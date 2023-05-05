<template>
  <div class="auth-wrapper">
    <h2>Register</h2>
    <div class="inputs-field">
      <form class="form" @submit.prevent="register">
        <InputSample
          v-model="registerForm.email"
          type="email"
          placeholder="Enter Email"
          v-focus
        >
          Email
        </InputSample>

        <InputSample
          v-model="registerForm.password"
          type="password"
          placeholder="Enter Password"
        >
          Password
        </InputSample>
        <InputSample
          type="password"
          v-model="registerForm.confirm"
          placeholder="Confirm Your Password"
        >
          Confirm Password
        </InputSample>
        <ButtonSample
          type="submit"
          :disabled="!isPasswordsMatch"
          v-bind:class="{
            'wrong': !isPasswordsMatch
          }"
        >
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
import { computed, reactive } from 'vue';
import router from '@/router';
import VFocus from '@/directives/VFocus';
import ButtonSample from '../components/UI/ButtonSample.vue';
import InputSample from '../components/UI/InputSample.vue';

const registerForm = reactive({
  password: '',
  email: '',
  confirm: '',
});
const store = useStore();

const register = async () => {
  try {
    await store.dispatch('auth/register', registerForm);
    router.push('/');
  } catch (error) {
    store.commit('setErrorMessage', error);
    store.commit('setErrorToastStatus');
  }
};

const isPasswordsMatch = computed(() => registerForm.confirm === registerForm.password);

</script>

<style scoped>
.auth-wrapper {
  margin: auto;
  padding: 10px;
  width: 700px;
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

.wrong:hover {
  color: var(--color-static);
  cursor: not-allowed;
}

</style>
