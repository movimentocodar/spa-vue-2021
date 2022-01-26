<template>
  <div class="container">
    <section class="produtos">
      <div class="navegacao">
        <p>Onde você está > Departamento:</p>
        <p data-navegacao>{{ valorDepartamento }}</p>
      </div>

      <h2>Destaque</h2>

      <div class="listaProdutos" data-lista-produtos>
        <Cards></Cards>
      </div>
    </section>

    <section class="carrinho" data-secao-carrinho>
      <Carrinho></Carrinho>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cards from "../components/Cards.vue";
import Carrinho from "../components/Carrinho.vue";
import { EventBus } from "../eventBus";

@Component({
  components: {
    Cards,
    Carrinho,
  },
})
export default class Home extends Vue {
  valorDepartamento = "Todos";

  methods(): void {
    this.botaoDepartamento;
  }

  created(): void {
    const _this = this;

    EventBus.$on("botaoDepartamento", function (valor: string) {
      _this.valorDepartamento = valor;
    });
  }

  botaoDepartamento(valor: string): void {
    this.valorDepartamento = valor;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 1%;
  justify-content: space-around;
}

.produtos {
  width: 85%;
  padding: 5px;
}

.navegacao p:last-child {
  text-transform: capitalize;
}

h2 {
  font-size: 25px;
  padding: 20px;
}
.navegacao p {
  padding-top: 10px;
}

.navegacao p:last-child {
  font-weight: bold;
}
.navegacao {
  display: flex;
}

.listaProdutos {
  display: flex;
  flex-wrap: wrap;
  margin: 12px;
}

.carrinho {
  width: 25%;
  padding: 0px 0px 10px 0px;
}

@media screen and (max-width: 768px) {
  .listaProdutos {
    justify-content: center;
  }

  .produtos {
    width: 100%;
  }

  .navegacao {
    flex-direction: column;
    padding-top: 10px;
    width: 100%;
    text-align: center;
  }

  .carrinho {
    width: 100%;
  }
}
</style>
