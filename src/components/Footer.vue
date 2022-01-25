<template>
  <footer>
    <div class="contatos">
      <a href="" title="facebook">
        <svg class="facebook"></svg>
      </a>
      <a href="" title="twitter">
        <svg class="twitter"></svg>
      </a>
      <a href="" title="instagram">
        <svg class="instagram"></svg>
      </a>
    </div>
    <p class="copyright">&copy; Copyright hugoogle - 2021</p>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Footer extends Vue {}
</script>

<style scoped>
.contatos {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
}

footer {
  color: #ffffff;
  font-weight: lighter;
  text-align: center;
  padding: 10px;
  background-color: #156f96;
  border-top: 1px solid #333;
  bottom: 0;
  left: 0;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  right: 0;
}

.facebook {
  display: flex;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  background: url(../assets/imagem/svg/facebook.svg) 0 0 no-repeat;
  cursor: pointer;
}

.twitter {
  display: flex;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  background: url(../assets/imagem/svg/twitter.svg) 0 0 no-repeat;
  cursor: pointer;
}

.instagram {
  display: flex;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  background: url(../assets/imagem/svg/instagram.svg) 0 0 no-repeat;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  footer {
    flex-direction: column;
  }
}
</style>
