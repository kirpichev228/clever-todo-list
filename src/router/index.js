import { createRouter, createWebHashHistory } from 'vue-router';
import { auth } from '@/firebase';

import App from '@/App.vue';
import MainPage from '@/views/MainPage.vue';
import AuthLogin from '@/views/AuthLogin.vue';
import AuthRegistration from '@/views/AuthRegistration.vue';

const routes = [
  // {
  //   path: '/',
  //   component: App,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
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

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' && auth.currentUser) {
//     next('/main');
//     return;
//   }

//   if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
//     next('/login');
//     return;
//   }

//   next();
// });

export default router;
