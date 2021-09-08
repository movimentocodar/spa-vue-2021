import Vue from "vue";
import Vuex from "vuex";
import modProd from "./api/prod.js";

Vue.use(Vuex);

const state = {
  search: "",
  cart: [],
  numcart: 0,
  showcart: false,
  arprod: [...modProd.getArProd()]
};

const mutations = {
  search(state, payload) {
    state.search = payload;
  },

  cart(state, payload) {
    state.cart = payload;
  },

  numcart(state, payload) {
    state.numcart = payload;
  },

  showcart(state, payload) {
    state.showcart = payload;
  }

};

const actions = {
  async changeSearch(context, payload) {
    context.commit("search", payload);
  },

  async changeCart(context, payload) {
    context.commit("cart", payload);
  },

  async changeNumCart(context, payload) {
    context.commit("numcart", payload);
  },

  async changeShowCart(context, payload) {
    context.commit("showcart", payload);
  }
};

const getters = {
  getSearch(state) {
    return state.search;
  },

  getCart(state) {
    return state.cart;
  },

  getNumCart(state) {
    return state.numcart;
  },

  getShowCart(state) {
    return state.showcart;
  },

  getArProd(state) {
    return state.arprod;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
