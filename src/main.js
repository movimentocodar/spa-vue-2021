import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/reset.css'

const store = Vue.observable({
  cart: {
    items: [],

    add(item){
      let arr = Object.values(store.cart.items)
      let find = arr.find(el => el.id == item.id)
      if (find == undefined){
        store.cart.items.push(item)
      }else{
        arr.forEach((el, index) => {
          if (el.id == item.id){
            store.cart.items[index].quantidade = item.quantidade
          }
        });
      }
    },

    sum(id, estoque){
      let arr = Object.values(store.cart.items)
      arr.forEach((el, index) => {
        if (el.id == id){
          if(store.cart.items[index].quantidade < estoque){
            store.cart.items[index].quantidade += 1
          }else{
            alert(`Produtos disponiveis: ${estoque}!`)
          }
        }
      })
    },
    
    sub(id){
      let arr = Object.values(store.cart.items)
      arr.forEach((el, index) => {
        if (el.id == id){
          if(store.cart.items[index].quantidade > 1){
            store.cart.items[index].quantidade -= 1
          }else{
            alert('Quantidade invalida!')
          }
        }
      })
    },

    deletex(id){
      let arr = Object.values(store.cart.items)
      arr.forEach((el, index) => {
        if (el.id == id){
          store.cart.items.splice(index, 1);
        }
      })
    },

    finalizar(){
      store.cart.items.splice(0, store.cart.items.length);
    }
  }
})

Vue.prototype.$store = store

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
