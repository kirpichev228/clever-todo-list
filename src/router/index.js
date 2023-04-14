import { createRouter, createWebHashHistory } from 'vue-router';

import App from '@/App.vue';
import MainPage from '@/components/MainPage.vue';
import AuthLogin from '@/components/authComponent/AuthLogin.vue';
import AuthRegistration from '@/components/authComponent/AuthRegistration.vue';

const routes = [
  {
    path: '/',
    component: App,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/main',
    name: 'Main',
    component: MainPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthLogin,
  },
  {
    path: '/register',
    name: 'Register',
    component: AuthRegistration,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
