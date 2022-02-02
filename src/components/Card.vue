<template>
  <div class="listaProdutos">
    <div class="card" v-for="produto in produtos" v-bind:key="produto.codigo">
      <div class="card-body">
        <img :src="produto.imagem" class="card-img-top" :alt="produto.imagem" />
        <p>{{ produto.descricao }}</p>
        <p class="card-price">R$ {{ produto.preco }}</p>
        <div class="input-group input-number-group">
          <div class="input-group-button">
            <span class="input-number-decrement" @click="decrementar(produto)"
              >-</span
            >
          </div>
          <input
            type="number"
            v-model.number="produto.quantidade"
            min="1"
            max="999"
            @keypress="somenteNumeros"
            @change="quantidadeInvalida"
          />
          <div class="input-group-button">
            <span class="input-number-increment" @click="incrementar(produto)"
              >+</span
            >
          </div>
        </div>
      </div>

      <button @click="adicionarProdutoNoCarrinho(produto)">
        Adicionar no Carrinho
      </button>
    </div>
    <pre></pre>
  </div>
</template>

<script lang="ts">
import { CarrinhoItem } from "@/model/Carrinho";
import { Component, Vue } from "vue-property-decorator";
import { Movimento } from "../model/enum";
import { Produto } from "../model/Produto";
import ProdutoStore from "../store/Store";
import ValidaCampoInput from "../util/validaCampoInput"

@Component
export default class Card extends Vue {
  get produtos(): CarrinhoItem[] {
    return ProdutoStore.getProdutos;
  }

  mounted(): void {
    ProdutoStore.buscarProdutos();
  }

  adicionarProdutoNoCarrinho(produto: Produto): void {
    ProdutoStore.addProdutoNoCarrinho(produto);
  }

  decrementar(produto: Produto): void {
    ProdutoStore.decrementarQuantidade({
      produto: produto,
      movimento: Movimento.DEBITO,
    });
  }

  incrementar(produto: Produto): void {
    ProdutoStore.icrementarQuantidade({
      produto: produto,
      movimento: Movimento.CREDITO,
    });
  }

    somenteNumeros(e: KeyboardEvent): void {
    ValidaCampoInput.somenteNumeros(e);
  }
   quantidadeInvalida(e: KeyboardEvent): void {
    ValidaCampoInput.quantidadeInvalida(e);
  }
}
</script>

<style scoped>
.listaProdutos {
  display: flex;
  flex-wrap: wrap;
  align-items: left;
  margin: 12px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: arial;
  margin: 1%;
  padding-bottom: 8px;
  border-radius: 5px;
  transition: all 0.5s;
  cursor: pointer;
}

.card p {
  margin: 0 0 0.3em;
}

.card-img-top {
  padding: 20px;
  width: 150px;
}

.card-price {
  color: #585050;
  font-size: 15px;
  padding: 10px;
}

.card-quantidade {
  width: 58px;
  padding: 4px;
  text-align: center;
}

.card-div-button {
  padding: 10px;
}

.card button {
  border: none;
  outline: 0;
  padding: 10px;
  color: #ffffff;
  background-color: #156f96;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 7px;
  margin: 11px;
}

.card button:hover {
  opacity: 0.7;
}

input {
  height: 26px;
  text-align: center;
  color: #156f96;
  font-weight: bold;
}

.input-number-group {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.input-number-group input[type="number"]::-webkit-inner-spin-button,
.input-number-group input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
}

.input-number-group .input-group-button {
  line-height: calc(60px / 2 - 5px);
}

.input-number-group .input-number {
  width: 60px;
  padding: 0 12px;
  text-align: center;
  outline: none;
  display: block;
  margin: 0;
}

.input-number-group .input-number,
.input-number-group .input-number-decrement,
.input-number-group .input-number-increment {
  border: 1px solid #cacaca;
  height: 25px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 0;
}

.input-number-group .input-number-decrement,
.input-number-group .input-number-increment {
  display: inline-block;
  width: 25px;
  height: 26px;
  background: #156f96;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 400;
}

.input-number-group .input-number-decrement {
  margin-right: 0.3rem;
}

.input-number-group .input-number-increment {
  margin-left: 0.3rem;
}

@media screen and (max-width: 768px) {
  .card button:hover {
    opacity: 100%;
  }
}
</style>
