<template>
    <div class="container">
        <!-- <label-category :title="produto.nome"></label-category> -->
        <div class="produto">
          
          <img :src="produto.imagem">
          <div class="info-produto">
            <div class="stats"><estrela class="stars" :stars="produto.estrelas"/><avaliacoes :avaliacoes="produto.avaliacoes"/></div>
            
            <h2>{{ produto.nome }}</h2>
            <div class="divpreco">
              <div class="estoque">Disponivel: {{produto.estoque}} unid.</div>
              <button @click="sum(produto.estoque)" class="btn-add">+</button>
              <div><span class="precoitem">{{ produto.preco }}</span> x {{ qnt }}</div>
              <hr>
              <div class="divtotal"><span class="total">{{ total() }}</span></div>
              <button @click="sub()" class="btn-sub">-</button>
            </div>
          </div>
        </div>
        <btn-carrinho 
          @click.native="$store.cart.add(
            cart(produto.nome,produto.imagem,qnt,
            produto.preco,produto.estoque,produto._key))"
            class="btn-carrinho"
          />
        <label-category title="Descrição"></label-category>
        <div class="desc">{{produto.desc}}</div>
    </div>
</template>

<script>
import ItemsDb from '../database/Items.json'
import LabelCategoria from '../components/sub-components/LabelCategoria.vue'
import BotaoAddCarrinho from '../components/sub-components/BotaoAddCarrinho.vue'
import ClassCarrinho from '../database/ClassCarrinho'
import Estrelas from '../components/sub-components/Estrelas.vue'
import Avaliacoes from '../components/sub-components/Avaliacoes.vue'

export default {
    components:{
        "label-category": LabelCategoria,
        "btn-carrinho": BotaoAddCarrinho,
        "estrela": Estrelas,
        "avaliacoes": Avaliacoes
    },

    data(){
        
        return{
            id: this.$route.params.id,
            qnt: this.$route.params.qnt,
            produto: [],
        }
    },

    created(){
        if (this.id){
            let objects = (Object.values(ItemsDb))
            return this.produto = objects.find(x => x._key == this.id)
            
        }
    },

    methods:{
      total(){
        return parseFloat(this.produto.preco) * this.qnt
      },
      sum(est){
        let estoque = parseInt(est)
        this.qnt = parseInt(this.qnt)
        if(this.qnt < estoque){
          this.qnt += 1
        }
      },
      sub(){
        this.qnt = parseInt(this.qnt)
        if(this.qnt > 1){
          this.qnt -= 1
        }
      },

      cart(nm, img, qnt, prec, est, id){
        return new ClassCarrinho(nm, img, parseInt(qnt), prec, parseInt(est), id)
      }
    },

    watch: {
    '$route.params.id': {
      handler () {
        this.id = this.$route.params.id
        let objects = (Object.values(ItemsDb))
        this.qnt = 1
        return this.produto = objects.find(x => x._key == this.id)
      }
    },
    '$route.params.qnt': {
      handler () {
        this.total()
      }
    }
  },
}
</script>

<style scoped>
h2{
    font-size: 20px;
    font-weight: bold;
    width: 400px;
}

.stars{
  width: fit-content;
  display: inline-block;
  margin-right: 5px;
}

.info-produto{
  display: flex;
  flex-direction: column;
}

.stats{
  margin-bottom: 5px;
}

.estoque{
  margin-bottom: 20px;
  color: rgb(109, 109, 109);
  font-size: 16px;
  font-weight: normal;
}

.btn-add {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  color: white;
  font-size: 22px;
  
  background-color: steelblue;
}

.btn-add:hover{
  background-color: rgb(89, 166, 230);
  cursor: pointer;
}

.btn-sub {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  color: white;
  font-size: 22px;
  background-color: rgb(223, 87, 63);
}

.btn-sub:hover {
  background-color: tomato;
  cursor: pointer;
}

.divtotal {
  text-align: center;
}

.total::before{
  content: "R$ ";
}
.total::after{
  content: ",00";
}

.divpreco{
  margin: auto;
  margin-right: 0;
  font-size: 20px;
  font-weight: bold;
  color: rgb(123, 185, 0);
}

.precoitem::before{
  content: 'R$ ';
}

.btn-carrinho{
  align-self: flex-end;
  margin-bottom: 10px;
  width: 100%;
}

.desc{
  margin-top: 10px;
  color: rgb(109, 109, 109);
}

.container{
  font-family: Arial, Helvetica, sans-serif;
  width: 848px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

img {
    width: 400px;
}

.produto{
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-between;
}
</style>
