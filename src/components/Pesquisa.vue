<template>
  <form data-form>
    <div data-form-pesquisa>
      <input
        type="search"
        id="busca"
        name="busca"
        v-on:input="produtoInformado($event.target.value)"
        data-filtrar-produto
        placeholder="Pesquise por produto..."
      /><svg alt="lupa"></svg>;
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EventBus } from "../eventBus";

@Component
export default class Pesquisa extends Vue {
  private filtro = "";

  produtoInformado(produto: string): void {
    EventBus.$emit("inputPesquisa", (this.filtro = produto));
  }
}
</script>
<style scoped>
form {
  width: 100%;
}

form input {
  border-radius: 20px;
  border: 1px solid #156f96;
  box-shadow: 0 4px 88px -7px #156f96;
  padding: 5px 20px;
}

form svg {
  width: 28px;
  position: absolute;
  left: 90%;
  top: -5px;
  transform: scaleX(-1);
  background: url(../assets/imagem/svg/lupa.svg) 0 0 no-repeat;
}

form button {
  background: #156f96;
  color: white;
  width: 55px;
  font-weight: bold;
  border-radius: 20px;
  border: 1px solid #156f96;
}

form div {
  width: 100%;
  position: relative;
}

form div input {
  width: 100%;
}

form div input,
button {
  padding: 10px;
  margin: -10px;
}

form div input:active,
input:focus {
  outline-color: #81abd8;
  background: cornsilk;
}

form div button {
  position: absolute;
  top: 0;
  right: 0;
}

form div button:hover {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  div form {
    width: 100%;
    margin: 5px;
  }

  form div input {
    padding: 10px;
    margin: 0px;
  }


  form svg {
    left: 81%;
    top: 6px
  }
}
</style>
