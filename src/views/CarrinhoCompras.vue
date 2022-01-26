<template>
  <div class="container">
    <label-category title="Carrinho"></label-category>
    <div class="linkwarning" v-if="produto.length == 0">
      <router-link class="carrinho-vazio" :to="{name: 'Home'}">
        :( Você não possui nada no seu carrinho<br>
        aperte aqui para voltar as compras
      </router-link>
    </div>
    <div v-for="itens in produto" :key="itens.id">
      <div class="boxItems">
        <img :src="itens.imagem">
        <div class="item-name">{{ itens.nome }}</div>
        <div class="preco">{{ itens.preco }}</div>
        <div class="qnt">
          <button @click="$store.cart.sub(itens.id)">-</button>
          <span>{{ itens.quantidade }}</span>
          <button @click="$store.cart.sum(itens.id, itens.estoque)">+</button>
        </div>
        <div class="total">{{ total(itens.preco, itens.quantidade) }}</div>
        <button @click="$store.cart.deletex(itens.id)" class="delete"><img src="https://image.flaticon.com/icons/png/512/1214/1214428.png"></button>
      </div>
    </div>
    <div class="finalizar">
      <div v-if="produto.length != 0" class="box-finalizar">
        <router-link :to="{name: 'Home'}"><button class="btn-voltar">Continuar comprando</button></router-link>
        <button @click="$store.cart.finalizar" class="btn-finalizar">Finalizar compra</button>
      </div>
    </div>
  </div>
</template>

<script>
import LabelCategoria from '../components/sub-components/LabelCategoria.vue'


export default {
  components:{
    "label-category": LabelCategoria
  },

  data(){
    return{
      produto : this.$store.cart.items,
    }
  },

  created(){
    console.log(this.produto.length)
  },

  methods: {
    total(x, y){
      return parseFloat(x) * parseInt (y)
    },
    
    sum(x){
      console.log(x)
      return x += 1
    },
    
    sub(){
      this.qnt = parseInt(this.qnt)
      if(this.qnt > 1){
        this.qnt -= 1
      }
    },
    sumTotal(x){
      return this.xtotal = this.xtotal + x
    }
  }
}
</script>

<style scoped>
.container {
  width: 848px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 70px;
  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
}

.linkwarning{
  display: flex;
  text-align: center;
}

.carrinho-vazio{
  margin: auto;
  margin-top: 15%;
  text-decoration: none;
  font-size: 22px;
  color: rgb(44, 68, 141);
}

.carrinho-vazio:visited{
  color: rgb(44, 68, 141);
}

.boxItems{
  display: flex;
  height: 60px;
  border: 1px solid steelblue;
  margin: 10px 0 10px 0;
  justify-content: space-between;
  border-radius: 5px;
  padding: 10px;
}

.item-name{
  width: 300px;
  overflow: hidden;
  padding: 5px;
  align-self: center;
}

.preco{
  align-self: center;
}

.preco::before{
  content: "R$ ";
}

.qnt{
  align-self: center;
  text-align: center;
}

.qnt>button{
  background-color: transparent;
  border-radius: 3px;
}

.qnt>button:hover{
  background-color: steelblue;
  color: white;
  cursor: pointer;
}

.qnt>span{
  padding: 5px;
}

.total{
  align-self: center;
}

.total::before{
  content: "Total: R$ ";
}

.total::after{
  content: ",00";
}

.delete>img {
  width: 20px;
  filter: invert(95%);
}

.delete {
  width: 40px;
  background-color: rgb(241, 70, 70);
  border-radius: 5px;
}

.delete:hover{
  background-color:rgb(206, 84, 84);
  cursor: pointer;
}

.finalizar {
  height: 60px;
  width: 100%;
  background-color: rgb(44, 68, 141);
  position: fixed;
  bottom: 0;
  left: 0;
}

.box-finalizar{
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.btn-finalizar{
  width: 400px;
  height: 45px;
  margin-top: 10px;

  background-color: rgb(84, 206, 84);
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
}

.btn-finalizar:hover{
    cursor: pointer;
    background-color: rgb(0, 200, 0);;
}

.btn-voltar{
  width: 400px;
  height: 45px;
  margin-top: 10px;

  background-color: rgb(241, 70, 70);
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
}

.btn-voltar:hover{
  cursor: pointer;
  background-color: rgb(170, 71, 71);
}
</style>
