<template>
    <div>
        <subtitle :pagetitle="'Contatos'" :visivel="false"></subtitle>       
        <div class="page-content">
            <section class="content-section">
                <form @submit.prevent="grava()">
                    <div>
                        <label for="email">Email</label>
                        <input v-model="contato.email" id="email">
                    </div>

                    <div>
                        <label for="mensagem">Mensagem</label>
                        <textarea v-model="contato.mensagem" id="mensagem"></textarea>
                    </div>

                    <div>
                        <button type="submit" class="addcart-button">Enviar</button>
                        <router-link to="/"><button class="addcart-button">Voltar</button></router-link>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import pageSubtitle from '../components/Subtitle.vue';

export default {
    components: {
        "subtitle": pageSubtitle
    },

  data() {
    return {
        contato: {
            email: '',
            mensagem: ''
      }
    }
  },

  methods: {

    grava() {
      console.log(this.contato);
      this.contato = {};
    }
  }
}
</script>

<style>

.page-content{
	background: #EDE8DB;
}

.content-section{
	width: 940px;
	height: auto;
	margin: 0 auto;
	padding: 70px 0;
}
</style>

