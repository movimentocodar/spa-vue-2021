<template>
  <div class="container">
    <label-category title="Carrinho"></label-category>
    <div class="linkwarning" v-if="produto.length == 0">
      <router-link :to="{name: 'Home'}">:( Você não possui nada no seu carrinho<br>
      aperte aqui para voltar as compras</router-link>
    </div>
    <div v-for="itens in produto" :key="itens.id">
      <div class="boxItems">
        <img :src="itens.imagem">
        <div class="item-name">{{ itens.nome }}</div>
        <div class="preco">{{ itens.preco }}</div>
        <div class="qnt">
          <button @click="$store.cart.sum(itens.id, itens.estoque)">+</button>
          <span>{{ itens.quantidade }}</span>
          <button @click="$store.cart.sub(itens.id)">-</button>
        </div>
        <div class="total">{{ total(itens.preco, itens.quantidade) }}</div>
        <button @click="$store.cart.deletex(itens.id)" class="delete">X</button>
      </div>
    </div>
    <div class="finalizar">
      <button @click="$store.cart.finalizar" class="btn-finalizar">Finalizar compra</button>
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
    }



  }
}
</script>

<style scoped>
.container {
  width: 848px;
  /* border: 1px solid red; */
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

a{
  margin: auto;
  margin-top: 15%;
  text-decoration: none;
  font-size: 22px;
  color: rgb(44, 68, 141);
}

a:visited{
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
  display: flex;
  flex-direction: column;
  align-self: center;
  text-align: center;
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

.delete {
  width: 30px;
  /* background-color: red; */
}

.finalizar {
  height: 60px;
  width: 100%;
  background-color: rgb(44, 68, 141);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;

}

.btn-finalizar{
  width: 70%;
  height: 45px;
  align-self: center;

}

</style>