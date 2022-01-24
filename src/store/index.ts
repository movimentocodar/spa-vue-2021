
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  
  state: {
    quantidade: 0
  },
  getters: {
    
    quantidade: (state) => state.quantidade

  },

  
  mutations: {

    atualizaQuantidadeNoCarrinho(state, delta: number){
      state.quantidade = Number(delta)
    }
    
  },
  actions: {

    atualizaQuantidadeNoCarrinho(context, delta: number){
        context.commit('atualizaQuantidadeNoCarrinho', delta)
      }



  },
  
   
});
