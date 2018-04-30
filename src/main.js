import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


// eslint-disable-next-line no-undef
const socket = io('http://localhost:8000');
Vue.prototype.$socket = socket;

// Whenever the server emits 'login', log the login message
socket.on('login', (data) => {
  console.log(data);
});

// Whenever the server emits 'new-message', update the chat body
socket.on('new-message', (data) => {
  console.log(data);
});

// Whenever the server emits 'user-joined', log it in the chat body
socket.on('user-joined', (data) => {
  console.log(data);
});

// Whenever the server emits 'user-left', log it in the chat body
socket.on('user-left', (data) => {
  console.log(data);
});

// Whenever the server emits 'typing', show the typing message
socket.on('typing', (data) => {
  console.log(data);
});

// Whenever the server emits 'stop-typing', kill the typing message
socket.on('stop-typing', (data) => {
  console.log(data);
});

socket.on('disconnect', () => {
  console.log('dis');
});

socket.on('reconnect', () => {
  console.log('re');
});

socket.on('reconnect_error', () => {
  console.log('re_err');
});
