<template>
  <div class="listaProdutos">
    <b-alert
      :show="tempo"
      variant="warning"
      @dismissed="0"
      @dismiss-count-down="countDownChanged"
    >
      <p class="mensagem">
        {{ mensagem }}
        {{ dismissCountDown }} segundos...
      </p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Store from "../store/Store";

@Component
export default class Mensagem extends Vue {
  @Prop() mensagemProp: string;

  private dismissCountDown = 0;

  private localDismissCountDown = 0;

  private dismissSecs = 5;

  get tempo(): number {
    return Store.getDismissCountDown;
  }

  get mensagem(): string {
    return this.mensagemProp;
  }

  countDownChanged(dismissCountDown: number): void {
    this.dismissCountDown = dismissCountDown;
    if (this.dismissCountDown === 0) {
      Store.pedidoFinalizado();
    }
  }
}
</script>

<style scoped>
.mensagem {
  text-align: center;
}
</style>
