<template>
  <div class="contato-form font">
    <h1>Contato</h1>
    <div class="erro">
      <b-alert
        variant="danger"
        fade
        :show="showDismissibleAlert"
        @dismissed="showDismissibleAlert = false"
      >
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index">
            {{ error }}
          </li>
        </ul>
      </b-alert>

      <b-alert
        :show="dismissCountDown"
        variant="success"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ mensagem }} {{ dismissCountDown }} segundos...
      </b-alert>
    </div>
    <div class="container">
      <form ref="form" @submit.prevent="sendEmail">
        <label>Nome</label>
        <input
          type="text"
          name="user_name"
          v-model="name"
          placeholder="Informe seu nome"
        />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          v-model="email"
          placeholder="Informe seu endereço de e-mail"
        />
        <label>Message</label>
        <textarea name="message" v-model="mensagemTextArea"></textarea>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import emailjs from "@emailjs/browser";
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class Contato extends Vue {
  @Ref("form") readonly form!: HTMLFormElement;
  errors = [] as string[];
  mensagem = "";
  dismissSecs = 5;
  dismissCountDown = 0;
  name = "";
  email = "";
  mensagemTextArea = "";
  showDismissibleAlert = false as boolean;

  methods():void {
    this.sendEmail();
    this.showAlert();
  }

  sendEmail():void {
    const dadosValidos = this.validaForm();
    if (dadosValidos) {
      this.mensagem = "Por favor aguarde...";
      this.showAlert();

      emailjs
        .sendForm(
          "service_f4w0h6x",
          "template_d8tzkko",
          this.form,
          "user_oEfG82w8A5HZ7XvdwLYSE"
        )
        .then(
          (result) => {
            this.mensagem =
              "Olá, agradecemos o seu contato logo entraremos em contato!.";
            console.log("Sucesso!", result.text);
            this.showAlert();
          },
          (error) => {
            this.mensagem = "Ocorreu um erro por favor tente mais tarde!.";
            console.log("Falhou...", error.text);
            this.showAlert();
          }
        );
    }
  }

  countDownChanged(dismissCountDown: number):void {
    this.dismissCountDown = dismissCountDown;
  }

  showAlert():void {
    this.dismissCountDown = this.dismissSecs;
  }

  validaForm():boolean {
    this.errors = [];

    if (!this.name) {
      this.errors.push("O nome é obrigatório.");
    }
    if (!this.email) {
      this.errors.push("O e-mail é obrigatória.");
    }

    if (!this.mensagemTextArea) {
      this.errors.push("A mensagem é obrigatoria.");
    }

    if (!this.errors.length) {
      this.showDismissibleAlert = false;
      return true;
    }

    this.showDismissibleAlert = true;
    return false;
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.erro {
  padding: 1%;
}
.success {
  padding: 13px;
}
.contato-form {
  text-align: center;
  font-family: 16px;
  width: 100%;
}
h1 {
  font-family: cursive;
  padding: 31px 5px 0px 6px;
  font-size: 43px;
  font-weight: bolder;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
  /* margin-top: 8%; */
}

label {
  float: left;
}

input[type="text"],
[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #156f96;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #156f96;
  opacity: 0.9;
}
</style>
