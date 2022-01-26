import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import './plugins/bootstrap-vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/reset.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueModal from '@kouts/vue-modal'

import '@kouts/vue-modal/dist/vue-modal.css'


Vue.config.productionTip = false;
Vue.config.devtools = true
Vue.use(VueAxios, axios, VueModal)

Vue.component('Modal', VueModal)

import Vuex from 'vuex'
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
