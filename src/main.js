import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// eslint-disable-next-line no-undef
const socket = io('http://localhost:8000');
Vue.prototype.$socket = socket;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

