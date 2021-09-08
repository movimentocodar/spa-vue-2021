<template>
    <div>
        <subtitle :pagetitle="'Contato'" :visivel="false"></subtitle>       
        <div class="page-content">
            <section class="content-section">
                <form @submit.prevent="grava()">
                    <div class="set-email">
                        <label for="email">Email</label><br>
                        <input class="input-email" v-model="contato.email" id="email">
                    </div>

                    <div class="set-mensagem">
                        <label for="mensagem">Mensagem</label><br>
                        <textarea class="input-mensagem" v-model="contato.mensagem" id="mensagem"></textarea>
                    </div>

                    <div>
                        <router-link to="/"><button class="addcart-button">Voltar</button></router-link>
                        <button type="submit" class="addcart-button">Enviar</button>
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

label {
    width:50px;
}

.page-content{
	background: #EDE8DB;
}

.content-section{
	width: 940px;
	height: auto;
	margin: 0 auto;
	padding: 70px 0;
}

.input-email {
    width:393px;
    height:40px;
    padding:5px 10px;
    margin: 10px;
}

.input-mensagem{
    width:393px;
    padding:10px;
    height:107px;
    margin: 10px;
}

form .addcart-button{
    margin:10px 10px 0 10px;
}

.set-email, .set-mensagem{
    display:block;
}
</style>

