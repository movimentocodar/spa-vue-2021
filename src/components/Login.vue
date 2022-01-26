<template>
  <div>
    <b-form @submit.prevent="logar($event)">
      <p class="erro">{{ mensagem }}</p>

      <b-form-group label="Username:">
        <b-form-input
          v-model="login"
          type="text"
          required
          placeholder="Usuario do GitHub"
        ></b-form-input>
      </b-form-group>
      <br />
      <b-button type="submit" class="submit" variant="primary">Entrar</b-button>
      <br />
      <br />
      <b-alert show>Informe o seu login do GitHub</b-alert>
    </b-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Usuario from "../model/Usuario";
import userServices from "../services/userServices";

@Component
export default class Login extends Vue {
  private login = "";
  private usuario: Usuario;
  private hideModal: false;
  private mensagem = "";

  async logar(): Promise<void> {
    return await userServices
      .getUser(this.login)
      .then((response) => {
        this.usuario = response.data;
        if (this.usuario.name == "" || this.usuario.name == null) {
          this.mensagem = "User name invalido!";
        } else {
          this.$emit("usuario-git", this.usuario, this.hideModal);
        }
      })
      .catch((e: Error) => {
        this.mensagem = `${e} - Tente novamente!`;
      });
  }
}
</script>
<style scoped>
.erro {
  color: brown;
}
</style>
