<template>
  <div id="app">
    <Header></Header>

    <main class="conteudoPrincipal">
      <router-view />
    </main>

    <Footer></Footer>
    <div class="espaco"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";
import Vuex from "vuex";
Vue.use(Vuex);

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style>
body {
  font-family: "Montserrat", sans-serif !important;
  color: #156f96;
}

.espaco {
  padding: 10px;
}

@media screen and (max-width: 768px) {
  .conteudoPrincipal .container {
    flex-direction: column;
  }
}
</style>
