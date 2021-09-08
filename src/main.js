import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueHead from 'vue-head'
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store'
import './assets/css/reset.css';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueHead);

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});