import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import UserLogin from './components/UserLogin.vue';
import UserPanel from './components/UserPanel.vue';

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin,
    meta: { requiresAuth: false }
  },
  {
    path: '/panel',
    name: 'UserPanel',
    component: UserPanel,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = userData && userData.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'UserLogin' });
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');