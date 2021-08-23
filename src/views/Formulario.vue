<template>
  <div class="container">
      <label-category title="Contato"></label-category>
      <form class="formulario" @submit.prevent="enviar()">
          <div>
              <label class="label" for="nome">Nome:</label><br>
              <input type="text" id="nome" v-model="nome" />
          </div>
          <div>
              <label class="label required" for="email">Email:</label><br>
              <input required type="email" id="email" v-model="email" />
          </div>
          <div>
              <label class="label" for="assunto">Assunto:</label><br>
              <input type="text" id="assunto" v-model="assunto" />
          </div>
          <div>
              <label class="label required" for="mensagem">Mensagem:</label><br>
              <textarea class="mensagem" required id="mensagem" v-model="mensagem" cols="30" rows="10"></textarea>
          </div>
          <div><button type="submit">Enviar mensagem</button></div>
          <div class="aviso">Todos os campos marcados com <span>*</span> são obrigatórios</div>
      </form>
  </div>
</template>

<script>
import LabelCategoria from '../components/sub-components/LabelCategoria.vue'
export default {
    components:{
        "label-category": LabelCategoria,
    },

    data(){
        return{
            nome: '',
            email: '',
            assunto: '',
            mensagem: ''
        }
    },

    methods: {
        enviar(){
            this.nome = ''
            this.email = ''
            this.assunto = ''
            this.mensagem =''
        }
    }
}
</script>

<style scoped>
.container {
    font-family: Arial, Helvetica, sans-serif;
    width: 848px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 70px;
}

.formulario{
    margin-top: 10px;
}

.label {
    margin: 5px;
}

input {
    margin: 5px;
    width: 300px;
}

.required::after{
    content: "*";
    color: red;
}

.mensagem{
    margin: 5px;
    width: 500px;
}

button{
    margin: 5px;
    height: 40px;
}

.aviso {
    margin: 5px;
}

span {
    color: red;
}
</style>