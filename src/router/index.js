import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase';
import store from '@/store';

import MainPage from '@/views/MainPage.vue';
import AuthLogin from '@/views/AuthLogin.vue';
import AuthRegistration from '@/views/AuthRegistration.vue';
import TaskPage from '@/views/TaskPage.vue';

const routes = [
  {
    path: '/',
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
  {
    path: '/task/:id',
    name: 'TaskPage',
    component: TaskPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/fetchUser');
  if ((to.path === '/login') && auth.currentUser) {
    next('/');
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = store.dispatch('auth/fetchUser');
    if (user) {
      next();
    } else {
      next('/login');
    }
  } else next();
});

export default router;
