import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { store } from "./index";
import { AxiosError, AxiosResponse } from "axios";
import Usuario from "@/model/Usuario";
import $http from "../api/httpGit";

@Module({
  dynamic: true,
  stateFactory: true,
  namespaced: true,
  name: "Login",
  store,
})
class Login extends VuexModule {
  private usuario: Usuario = { name: "", avatar_url: "", nomeDoUsuario: "" };

  private hideModal = false;
  private mensagem = "";
  private estaLogado = false;

  get getUsuario(): Usuario {
    return this.usuario;
  }

  set setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  get getMensagem() {
    return this.mensagem;
  }

  get getModalIsShown() {
    return this.hideModal;
  }

  set setModalIsShown(estado: boolean) {
    this.hideModal = estado;
  }

  @Action
  async logar(usuario: string) {
    try {
      const response = await $http.get<Usuario>(`/users/${usuario}`);
      this.atualizarLogin(response);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (this.usuario.name === "" || this.usuario.name === null) {
          this.atualizarMensagem("User name invalido!");
        } else {
          this.atualizarMensagem(
            "Ocorreu um erro " + err.response.status.toString()
          );
          console.log("Ocorreu um erro " + err.response.status);
          console.log(err.response.data);
        }
      }
    }
  }

  @Mutation
  atualizarLogin(response: AxiosResponse<Usuario>) {
    if (response.data.name === null) {
      this.usuario.name = "Sem nome";
      this.usuario.avatar_url = response.data.avatar_url;
    } else {
      this.usuario = response.data;
    }
    this.hideModal = false;
  }

  @Mutation
  atualizarMensagem(mensagem: string) {
    this.mensagem = mensagem;
  }

  @Mutation
  ModalisShowHide(status: boolean) {
    this.hideModal = status;
    this.mensagem = "";
  }

  @Mutation
  deslogar() {
    const isLogado = confirm("Deseja realmente sair?");
    if (isLogado) {
      this.usuario.name = "";
      this.usuario.avatar_url = "";
      this.mensagem = "";
      this.hideModal = false;
    }
  }
}

const login = getModule(Login);
export default login;
