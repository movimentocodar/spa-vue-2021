<template>
  <div class="listaProdutos">
    <div class="card" v-for="produto in filtrarProduto" v-bind:key="produto.id">
      <div class="card-body">
        <img
          :src="produto.imagem"
          class="card-img-top"
          :alt="produto.imagem"
          :data-produto-imagem="produto.imagem"
        />
        <p data-produto-descricao="">{{ produto.descricao }}</p>
        <p class="card-price" data-produto-preco="">R$ {{ produto.preco }}</p>
        <div class="input-group input-number-group">
          <div class="input-group-button">
            <span
              class="input-number-decrement"
              @click="decrementa($event.target)"
              >-</span
            >
          </div>
          <input
            class="input-number"
            data-produto-quantidade
            @input="validaQuantidade"
            @keypress="somenteNumeros"
            type="number"
            value="1"
            min="1"
            max="999"
          />
          <div class="input-group-button">
            <span
              class="input-number-increment"
              @click="incrementa($event.target)"
              >+</span
            >
          </div>
        </div>
      </div>
      <button
        :data-produto-codigo="produto.codigo"
        @click="comprar($event.target)"
      >
        Comprar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProdutoModel from "../model/Produto";
import { EventBus } from "../eventBus";
import cardsController from "../controller/cardsController";

@Component
export default class Cards extends Vue {
  private search = "";
  private departamento = "";
  private produtos: ProdutoModel[] = [];
  private produto: ProdutoModel;

  async getProdutos(): Promise<ProdutoModel[]> {
    return cardsController.getProdutos().then((produto) => {
      this.produtos = produto;
      return this.produtos;
    });
  }

  mounted(): void {
    this.getProdutos();
  }

  comprar(produtoElemento: HTMLButtonElement): void {
    this.produto = cardsController.comprar(produtoElemento);
    EventBus.$emit("submit", this.produto);
  }

  created(): void {
    const _this = this;
    EventBus.$on("botaoDepartamento", function (valor: string) {
      _this.search = "";
      _this.departamento = valor;
    });
  }

  validaQuantidade(e: KeyboardEvent): void {
    cardsController.validaQuantidade(e);
  }

  somenteNumeros(e: KeyboardEvent): void {
    cardsController.somenteNumeros(e);
  }

  incrementa(e: HTMLInputElement): void {
    cardsController.incrementa(e);
  }

  decrementa(e: HTMLInputElement): void {
    cardsController.decrementa(e);
  }

  get filtrarProduto(): ProdutoModel[] {
    const _this = this;
    if (!_this.search) {
      EventBus.$on("inputPesquisa", function (search: string) {
        _this.search = search;
      });
    } else {
      EventBus.$on("botaoDepartamento", function (departamento: string) {
        _this.search = "";
        _this.departamento = departamento;
      });
    }

    return this.produtos.filter((produto) => {
      if (_this.search) {
         if (produto.descricao.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
           return produto
         }
      } else {
        const departamento =
          this.departamento === "Todos" ? "" : this.departamento;

        return produto.departamento.match(departamento);
      }
    });
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
  font-size: 15px;
  border-radius: 7px;
  margin: 11px;
}

.card button:hover {
  opacity: 0.7;
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
