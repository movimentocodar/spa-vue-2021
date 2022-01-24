<template>
  <div class="carrinho-lista">
    <h3>Carrinho</h3>

    <ul data-carrinho-lista="">
      <li
        class="carrinho-compras-lista"
        v-for="(produto, index) in listarProdutos"
        v-bind:key="index"
      >
        <img
          :src="produto.imagem"
          :alt="produto.descricao"
          class="carrinho-compras-produto"
        />
        <div class="carrinho-compras-item">
          <p
            class="carrinho-compras-descricao"
            :data-carrinho-produto="produto.descricao"
          >
            {{ produto.descricao }}
          </p>
          <p
            :data-carrinho-quantidade="produto.quantidade"
            class="carrinho-compras-quantidade"
          >
            Qtd.: {{ produto.quantidade }} und.
          </p>
          <p
            :data-carrinho-valor="produto.preco"
            class="carrinho-compras-valor"
          >
            R$ {{ produto.preco }}
          </p>
        </div>
        <button
          class="carrinho-compras-excluir"
          :data-produto="produto"
          :data-carrinho-excluir="index"
          @click="remover(produto)"
        ></button>
      </li>
    </ul>

    <div class="compras-carrinho-finalizar" data-compras-carrinho="">
      <p
        class="compras-carrinho-vazio"
        data-carrinho-vazio=""
        v-show="listaDeprodutos.length === 0"
      >
        Carrinho Vazio!
      </p>
      <div class="compras-carrinho-total">
        <p>Valor Total:</p>
        <p data-carrinho-total="">R$ {{ valorTotalDeProdutos }}</p>
      </div>
      <div class="compras-carrinho-total">
        <p>Quantidade Total:</p>
        <p data-carrinho-quantidade-total="">
          {{ quantidadeTotalDeProdutos }} und.
        </p>
      </div>
      <button
        class="card button"
        data-finalizar-compra=""
        @click="verificaItensNoCarrinho"
      >
        Finalizar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EventBus } from "../eventBus";
import { Carrinho } from "../controller/carrinhoController";
import ProdutoModel from "../model/Produto";
import { Movimento } from "../model/enum";

@Component
export default class Car extends Vue {
  private listaDeprodutos: readonly ProdutoModel[] = [] as ProdutoModel[];
  private quantidadeTotal = 0;
  private valorTotal = 0;

  methods(): void {
    this.submit;
  }

  created(): void {
    const _this = this;
    EventBus.$on("submit", function(produto: ProdutoModel) {
      Carrinho.adiciona(produto);
      _this.calcularQuantidadeTotal(produto, Movimento.CREDITO);
      _this.calcularValorTotal(produto, Movimento.CREDITO);
      _this.atualizaQuantidadeNoCarrinho();
    });
  }

  destroyed(): void {
    EventBus.$off("submit");
  }

  submit(produto: ProdutoModel): void {
    Carrinho.adiciona(produto);
  }

  mounted(): void {
    this.calculaCompra();
  }

  calculaCompra(): void {
    this.quantidadeTotal = 0;
    this.valorTotal = 0;
    this.listaDeprodutos.forEach((produto) => {
      this.quantidadeTotal += produto.quantidade;
    });

    this.listaDeprodutos.forEach((produto) => {
      this.valorTotal += parseFloat(produto.preco);
    });
  }

  get listarProdutos(): readonly ProdutoModel[] {
    this.listaDeprodutos = Carrinho.lista();
    return this.listaDeprodutos;
  }

  get quantidadeTotalDeProdutos(): number {
    return this.quantidadeTotal;
  }

  get valorTotalDeProdutos(): number {
    return parseFloat(this.valorTotal.toFixed(2));
  }

  calcularQuantidadeTotal(produto: ProdutoModel, movimento: Movimento): void {
    this.quantidadeTotal = Carrinho.quantidadeTotal(produto, movimento);
  }

  calcularValorTotal(produto: ProdutoModel, movimento: Movimento): void {
    this.valorTotal = Carrinho.valorTotal(produto, movimento);
  }

  remover(produto: ProdutoModel): void {
    Carrinho.remover(produto);
    this.calcularValorTotal(produto, Movimento.DEBITO);
    this.calcularQuantidadeTotal(produto, Movimento.DEBITO);
    this.atualizaQuantidadeNoCarrinho();
  }

  verificaItensNoCarrinho(): void {
    if (this.quantidadeTotal != 0) {
      let remover = confirm("Deseja realmente finalizar o pedido?");

      remover == true ? this.finalizar() : false;
    }
  }

  finalizar(): void {
    try {
      Carrinho.finalizar();
      EventBus.$emit(
        "carrinho-finaliza",
        "Pedido enviado com sucesso, já estamos preparando o seu pedido, volte sempre!"
      );
      this.quantidadeTotal = 0;
      this.valorTotal = 0;
      this.$store.state.quantidade = this.valorTotal;
    } catch (error) {
      EventBus.$emit("carrinho-finaliza", error);
    }
      window.scrollTo(0, 0);
  }

  get contador(): number {
    return this.$store.getters.quantidade;
  }

  atualizaQuantidadeNoCarrinho(): void {
    this.$store.dispatch("atualizaQuantidadeNoCarrinho", this.quantidadeTotal);
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
</style>
