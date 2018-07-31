import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard.vue';
import ShowScribblePage from './pages/ShowScribblePage.vue';
import NotFound from './pages/NotFound.vue';
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

function logout() {
  cookies.removeToken();
  window.location.href = '/';
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
      component: Dashboard,
      beforeEnter: requiresAuth,
    },
    {
      path: '/scribbles',
      name: 'scribbles',
      redirect: '/dashboard',
    },
    {
      path: '/scribbles/:id',
      name: 'scribble_show',
      component: ShowScribblePage,
      beforeEnter: requiresAuth,
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: logout,
    },
    {
      path: '*',
      name: 'not_found',
      component: NotFound,
    },
  ],
});
