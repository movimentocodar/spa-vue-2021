<template>
  <div class="container">
    <section class="produtos">
      <div class="navegacao">
        <p>Onde você está > Departamento:</p>
        <p>{{ departamento }}</p>
      </div>

      <h2>Destaque</h2>

      <div class="listaProdutos">
        <Card></Card>
      </div>
    </section>

    <section class="carrinho">
      <Carrinho></Carrinho>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "../components/Card.vue";
import Carrinho from "../components/Carrinho.vue";
import Store from "../store/Store";
@Component({
  components: {
    Card,
    Carrinho,
  },
})
export default class Home extends Vue {
 
 get departamento(): string {
    return Store.getDepartamento;
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
