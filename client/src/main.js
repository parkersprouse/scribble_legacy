import Buefy from 'buefy';
import Vue from 'vue';
import 'buefy/lib/buefy.css';

import App from './App.vue';
import router from './router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import './assets/styles/fontawesome.min.css';
import './assets/styles/hamburgers.css';
import './assets/styles/styles.scss';

Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.component('custom-navbar', Navbar);
Vue.component('custom-footer', Footer);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
