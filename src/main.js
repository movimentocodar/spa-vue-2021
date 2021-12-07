import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './directives/AdicionarCarrinho.js';
import './directives/FinalizarCarrinho.js';
import VeeValidate from 'vee-validate';
import msg from './pt_BR.js';

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  locale: 'pt_BR',

  dictionary: {

    pt_BR: {
      messages: msg
    }

  }

});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')