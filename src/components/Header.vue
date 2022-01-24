<template>
  <header>
    <div>
      <div id="mensagem" class="success" data-mensagem></div>
      <ul class="atendimento">
        <li>Compre pelo tel: 0800 123 4500</li>
        <li>
          <svg alt="sacola"></svg>
        </li>
        <li>
          <router-link to="/">Home</router-link> |
          <router-link to="/contato">Contato</router-link>
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

      <Pesquisa @inputPesquisa="inputPesquisa($event)"></Pesquisa>

      <nav class="cabecalhoPrincipal-nav">
        <svg v-if="usuario.avatar_url == undefined" alt="user"></svg>
        <img else :src="usuario.avatar_url" />

        <a href="" @click.prevent="showModals(true)">
          {{ usuario.name == undefined ? "Login" : usuario.name }}</a
        >

        <Modal
          :based-on="showModal"
          title="Hugoogle Supermercado"
          @close="showModal = false"
        >
          <Login @usuario-git="usuarioGit"></Login>
        </Modal>

        <!-- <div >
          <svg alt="user"></svg>
          <a href="" @click.prevent="showModals(true)"> Login </a>
        </div> -->

        <div>
          <svg alt="carrinho"></svg>
          <span data-carrinho-quantidade-itens> {{ quantidade }} </span>
        </div>
      </nav>
    </div>

    <nav class="page__menu menu" data-menu-departamento>
      <FiltroDepartamento></FiltroDepartamento>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pesquisa from "./Pesquisa.vue";
import FiltroDepartamento from "./FiltroDepartamento.vue";
import userServices from "../services/userServices";
import Usuario from "../model/Usuario";
import { EventBus } from "../eventBus";
import Login from "../components/Login.vue";

@Component({
  components: {
    Pesquisa,
    FiltroDepartamento,
    Login,
  },
})
export default class Header extends Vue {
  private usuario = {} as Usuario;
  valorInputPesquisa = "";
  departamento = "";
  showModal = false;

  async getUsuario(login: string): Promise<void> {
    await userServices
      .getUser(login)
      .then((response) => {
        return (this.usuario = response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  methods(): void {
    this.inputPesquisa;
    this.usuarioGit(this.usuario);
    this.showModals;
  }

  showModals(estado: boolean): boolean {
    return (this.showModal = estado);
  }
  inputPesquisa(valor: string): void {
    this.valorInputPesquisa = valor;
  }

  getDepartamento(): void {
    const _this = this;

    EventBus.$on("botaoDepartamento", function(valor: string) {
      _this.departamento = valor;
    });
  }

  get quantidade(): number {
    return this.$store.getters.quantidade;
  }

  usuarioGit(usuario: Usuario): void {
    this.usuario = usuario;
  }
}
</script>

<style scoped>
header {
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 5px 10px 0px #6b6b6b;
}

.success {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
  position: absolute;
  right: 2%;
  font-size: larger;
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

h1 img {
  width: 200px;
}

nav img {
  width: 14%;
  border-radius: 50%;
}
nav svg {
  width: 48px;
  height: 33px;
  background: url(../assets/imagem/svg/user.svg) 0 0 no-repeat;
}

nav a {
  padding: 0px 10px;
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
}

.cabecalhoPrincipal .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
