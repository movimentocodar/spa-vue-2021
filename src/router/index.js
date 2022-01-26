import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contato',
    name: 'Contato',
    component: () => import('../views/Formulario.vue')
  },
  {
    path: '/precarrinho/:qnt/:id',
    name: 'PreCarrinho',
    component: () => import('../views/PreCarrinho.vue')
  },
  {
    path: '/carrinho',
    name: 'CarrinhoCompra',
    component: () => import('../views/CarrinhoCompras.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
