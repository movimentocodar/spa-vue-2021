<template>
  <div>
    <b-form ref="form" @submit.prevent="getUsuario($event)">
      <p class="nome">{{ mensagem }} {{ usuario.name }}</p>

      <b-form-group label="Username:">
        <b-form-input
          v-model="login"
          type="text"
          placeholder="Usuario do GitHub"
        ></b-form-input>
      </b-form-group>
      <br />
      <b-button type="submit" class="submit" variant="primary">Logar</b-button>
      <br />
      <br />
      <b-alert show>Informe o seu login do GitHub</b-alert>
    </b-form>
  </div>
</template>
<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import userServices from "../services/userServices";
import Usuario from "../model/Usuario";

@Component({ name: "Login" })
export default class Login extends Vue {
  @Ref("form") readonly form!: HTMLFormElement;

  mensagem = "";
  login = "";
  usuario = {} as Usuario;

  async getUsuario(): Promise<void> {
    const login: string = this.form.querySelectorAll("input").item(0).value;
    await userServices
      .getUser(login)
      .then((response) => {
        this.usuario = response.data;
        if (this.usuario.name == "" || this.usuario.name == null) {
          this.mensagem = "User name invalido!";
        } else {
          this.$emit("usuario-git", this.usuario);
        }
      })
      .catch((e: Error) => {
        this.mensagem = `${e} - Tente novamente!`;
      });
  }
}
</script>
