<template>
  <div class="carrinho-lista">
    <h3>Carrinho</h3>

    <ul>
      <li
        class="carrinho-compras-lista"
        v-for="(produto, index) in carrinho"
        v-bind:key="index"
      >
        <img
          :src="produto.imagem"
          :alt="produto.descricao"
          class="carrinho-compras-produto"
        />
        <div class="carrinho-compras-item">
          <p class="carrinho-compras-descricao">
            {{ produto.descricao }}
          </p>
          <p class="carrinho-compras-quantidade">
            Qtd.: {{ produto.quantidade }} und.
          </p>
          <p class="carrinho-compras-valor">
            R$ {{ produto.preco }} x {{ produto.quantidade }} =
            {{ produto.precoTotal }}
          </p>
        </div>
        <button
          class="carrinho-compras-excluir"
          @click.prevent="removerProdutoDoCarrinho(produto)"
        ></button>
      </li>
    </ul>

    <div class="compras-carrinho-finalizar">
      <p class="compras-carrinho-vazio" v-if="!quantidade">Carrinho Vazio!</p>
      <div class="compras-carrinho-total">
        <p>Valor Total:</p>
        <p>R$ {{ total }}</p>
      </div>
      <div class="compras-carrinho-total">
        <p>Quantidade Total de Item(s):</p>
        <p>
          {{ quantidade }}
        </p>
      </div>
      <button class="card button" @click="finalizarCompra()">Finalizar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Produto } from "../model/Produto";
import Store from "../store/Store";
import { Carrinho } from "../model/Carrinho";

@Component
export default class CarrinhoDeCompras extends Vue {
  get carrinho(): Carrinho[] {
    return Store.getCarrinho;
  }

  get total(): string {
    return Store.valorTotalNoCarrinho.toFixed(2);
  }

  get quantidade(): number {
    return Store.quantidadeTotal;
  }

  removerProdutoDoCarrinho(produto: Produto): void {
    Store.excluirProdutoDoCarrinho(produto);
  }

  finalizarCompra(): void {
    Store.finalizarPedido();
  }
}
</script>

<style scoped>
.carrinho {
  width: 25%;
  padding: 0px 0px 10px 0px;
}

.carrinho-lista {
  background: hsl(0deg 0% 97%);
  box-sizing: border-box;
  box-shadow: 0 5px 10px 0px #7d8f97;
  border-radius: 10px;
  padding: 1px;
}

.carrinho-lista h3 {
  background: hsl(0deg 0% 29%);
  color: #ffffff;
  padding: 20px;
  text-align: center;
  border-radius: 14px 14px 0px 1px;
  background: #156f96;
}

.carrinho-lista ul {
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
}

.carrinho-lista li {
  border-bottom: 1px solid #ddd;
  text-align: left;
  border-bottom-style: dashed;
}

.carrinho-compras-produto {
  padding: 5px;
  width: 15%;
  border-radius: 50%;
}

.carrinho-compras-item {
  padding: 0rem 1rem;
}

.carrinho-compras-descricao {
  padding: 2px;
  font-family: cursive;
  font-size: 1rem;
  font-weight: bold;
}

.carrinho-compras-quantidade {
  padding-top: 10px;
  padding-bottom: 5px;
}

.carrinho-compras-valor {
  font-size: 10px;
}

.carrinho-compras-excluir {
  border: none;
  outline: none;
  padding: 15px;
  background-repeat: no-repeat;
  background: url("../assets/imagem/svg/excluir.svg") 0 0 no-repeat;
  cursor: pointer;
}

.compras-carrinho-vazio {
  text-align: center;
  padding: 15px;
  font-weight: bold;
  font-size: 1.3rem;
}

.compras-carrinho-total p:nth-of-type(1) {
  text-align: center;
  padding: 5px;
  font-weight: bold;
}

.compras-carrinho-total p:nth-of-type(2) {
  padding: 5px;
}

.compras-carrinho-finalizar button {
  border: none;
  outline: 0;
  padding: 10px;
  color: #ffffff;
  background-color: #156f96;
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 7px;
  margin: 11px;
  cursor: pointer;
}

.carrinho-compras-lista {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}

.carrinho-compras-lista div:nth-of-type(1) {
  flex-grow: 2;
}

.compras-carrinho-total {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

@media screen and (max-width: 768px) {
  .carrinho {
    width: 100%;
    padding: 0px;
  }
}
</style>
