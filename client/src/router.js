import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import api from './lib/api';
import cookies from './lib/cookies';

Vue.use(Router);

function requiresAuth(to, from, next) {
  api.verifyAuthToken(cookies.getToken(), (success) => {
    if (success) {
      next();
    } else {
      next({ path: '/', query: { n: to.fullPath } });
    }
  });
}

function excludesAuth(to, from, next) {
  api.verifyAuthToken(cookies.getToken(), (success) => {
    if (success) {
      next('/dashboard');
    } else {
      next();
    }
  });
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: excludesAuth,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: null,
      beforeEnter: requiresAuth,
    },
    {
      path: '*',
      name: 'not_found',
      component: null,
    },
  ],
});
