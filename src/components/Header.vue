<template>
  <header>
    <div>
      <Mensagem :mensagemProp="mensagemProp"></Mensagem>

      <ul class="atendimento">
        <li>Compre pelo tel: 0800 123 4500</li>
        <li>
          <svg alt="sacola"></svg>
        </li>
        <li>
          <router-link to="/">Home</router-link> |
          <router-link to="/contato">Contato</router-link>
          <router-link
            v-if="usuario.name != ''"
            class="sair"
            @click.native="deslogar"
            to="/"
          >
            | Sair</router-link
          >
        </li>
      </ul>
    </div>
    <div class="cabecalhoPrincipal">
      <h1>
        <img
          src="../assets/imagem/logo/logo.png"
          alt="Hugoogle Supermercados"
          title="Hugoogle Supermercados"
        />
      </h1>

      <img
        src="../assets/imagem/logo/familia.jpg"
        alt="O supermecado da familia!"
        title="O Supermercado da Familia!"
      />

      <Pesquisa></Pesquisa>

      <nav class="cabecalhoPrincipal-nav">
        <Login></Login>

        <div>
          <svg alt="carrinho"></svg>
          <span> {{ quantidade }} </span>
        </div>
      </nav>
    </div>

    <nav class="page__menu menu">
      <FiltroDepartamento></FiltroDepartamento>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pesquisa from "../components/Pesquisa.vue";
import FiltroDepartamento from "./FiltroDepartamento.vue";
import Login from "../components/Login.vue";
import Store from "../store/Store";
import Mensagem from "../components/Mensagem.vue";
import StoreLogin from "../store/StoreLogin";
import Usuario from "@/model/Usuario";

@Component({
  components: {
    Pesquisa,
    FiltroDepartamento,
    Login,
    Mensagem,
  },
})
export default class Header extends Vue {
  private showModal = false;

  get usuario(): Usuario {
    return StoreLogin.getUsuario;
  }

  get mensagemProp(): string {
    return Store.mensagemStore;
  }

  get quantidade(): number {
    return Store.quantidadeTotal;
  }

  deslogar(): void {
    StoreLogin.deslogar();
  }
}
</script>

<style scoped>
header {
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 5px 10px 0px #6b6b6b;
}

.atendimento li {
  list-style: none;
  margin-left: 10px;
}

.atendimento li a:visited {
  color: #156f96;
}

.atendimento li svg {
  width: 18px;
  height: 18px;
  margin-top: -2px;
  background: url(../assets/imagem/svg/sacola.svg) 0 0 no-repeat;
}

a {
  color: #156f96;
  text-decoration: underline;
  cursor: pointer;
}

h1 img {
  width: 200px;
}

header div nav div svg {
  width: 32px;
  height: 32px;
  margin-left: 11px;
  background: url(../assets/imagem/svg/carrinho.svg) 0 0 no-repeat;
}

nav div span {
  position: absolute;
  background: #156f96;
  border-radius: 58%;
  height: 21px;
  width: 21px;
  line-height: 22px;
  display: inline-block;
  text-align: center;
  margin: -8px -13px;
  font-weight: bolder;
  color: white;
  font-size: small;
}

.atendimento {
  display: flex;
  justify-content: center;
}

.cabecalhoPrincipal {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.cabecalhoPrincipal-nav {
  display: flex;
  align-items: center;
  margin: 15px;
}

.cabecalhoPrincipal .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  header {
    padding: 2px;
  }

  h1 img {
    width: 100px;
  }
  .atendimento li {
    padding-top: 5px;
    padding-bottom: 10px;
    flex-direction: column;
    align-items: center;
  }

  .cabecalhoPrincipal {
    flex-direction: column;
  }

  .atendimento {
    flex-direction: column;
    text-align: center;
  }
}
</style>
