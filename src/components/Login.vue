<template>
  <div class="login">
    <svg v-if="usuario.avatar_url == ''" alt="user"></svg>
    <img else :src="usuario.avatar_url" />

    <a href="" @click.prevent="modalOpen(true)">
      {{ usuario.name == "" ? "Login" : usuario.name }}</a
    >

    <Modal
      :based-on="modalisShown"
      title="Hugoogle Supermercado"
      @close="modalisShown = modalOpen(false)"
    >
      <b-form @submit.prevent="logar">
        <p class="erro">{{ mensagem }}</p>

        <b-form-group label="Username:">
          <b-form-input
            v-model="user"
            type="text"
            required
            placeholder="Usuario do GitHub"
          ></b-form-input>
        </b-form-group>
        <br />
        <b-button type="submit" class="submit" variant="primary"
          >Entrar</b-button
        >
        <br />
        <br />
        <b-alert show>Informe o seu login do GitHub</b-alert>
      </b-form>
    </Modal>
  </div>
</template>
<script lang="ts">
import Usuario from "@/model/Usuario";
import { Component, Vue } from "vue-property-decorator";
import StoreLogin from "../store/StoreLogin";

@Component
export default class Login extends Vue {
  private user = "";
  private showModal = false;

  get mensagem(): string {
    return StoreLogin.getMensagem;
  }

  get usuario(): Usuario {
    return StoreLogin.getUsuario;
  }

  get modalisShown(): boolean {
    return StoreLogin.getModalIsShown;
  }

  set modalisShown(estado: boolean) {
    StoreLogin.setModalIsShown = estado;
  }

  modalOpen(estado: boolean): void {
    this.user = "";
    StoreLogin.ModalisShowHide(estado);
  }

  logar(): void {
    StoreLogin.logar(this.user);
  }
}
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.erro {
  color: brown;
}

a {
  color: #156f96;
  text-decoration: underline;
  cursor: pointer;
}

h1 img {
  width: 200px;
}

nav img {
  width: 18%;
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
</style>
