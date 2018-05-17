import Buefy from 'buefy';
import Vue from 'vue';
import 'buefy/lib/buefy.css';

import App from './App.vue';
import router from './router';
import Footer from './components/Footer.vue';
import './assets/styles/styles.scss';
import './assets/styles/materialdesignicons.min.css';

Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.component('full-footer', Footer);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
