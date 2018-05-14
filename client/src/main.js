import Buefy from 'buefy';
import Vue from 'vue';
import 'buefy/lib/buefy.css';

import App from './App.vue';
import router from './router';
import './assets/styles.scss';

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
