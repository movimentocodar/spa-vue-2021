import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueHead from 'vue-head'
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/subtitle';
import Vuex from 'vuex';
import arProd from "./api/prod.js";
import store from './store'

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