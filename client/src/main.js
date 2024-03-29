import Buefy from 'buefy';
import Vue from 'vue';
import './assets/styles/buefy.min.css';

import App from './App.vue';
import router from './router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Paginator from './components/Pagination/Paginator.vue';
import './assets/styles/fontawesome.min.css';
import './assets/styles/hamburgers.css';
import './assets/styles/styles.scss';

Vue.config.productionTip = false;
Vue.use(Buefy, { defaultIconPack: 'fas' });

Vue.component('custom-navbar', Navbar);
Vue.component('custom-footer', Footer);
Vue.component('custom-paginator', Paginator);

// eslint-disable-next-line
Raven.context(() => {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
});
