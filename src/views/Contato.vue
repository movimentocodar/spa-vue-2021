<template>
  <div class="contato">
    <h1>Contato</h1>

    <form ref="formulario" @submit.prevent="limpa()" class="formulario">
      <div class="formulario__email">
        <label class="formulario__label" for="email">E-mail</label>
        <input v-validate data-vv-rules="required|email" class="formulario__input" type="email" id="email" name="email">
        <span class="formulario__erro" v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </div>

      <div class="formulario__mensagem">
        <label class="formulario__label" for="mensagem">Mensagem</label>
        <textarea v-validate data-vv-rules="required" class="formulario__input" type="textarea" id="mensagem" name="mensagem" rows="5"></textarea>
        <span class="formulario__erro" v-show="errors.has('mensagem')">{{ errors.first('mensagem') }}</span>
      </div>

      <input class="formulario__submit" type="submit" value="Enviar">
    </form> 

  </div>
</template>

<script>
export default {
  methods: {

    limpa() {

        this.$validator
          .validateAll()
          .then(success => {
            if(success) {

              this.$refs.formulario.reset();

            }
        });
    }
  }
}
</script>

<style scoped>
input {
  all: unset;
}

.contato{
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2em;
  height: 100vh;
}

label, input{
  display: block;
}

.formulario{
  width: 50%;
}

.formulario__label{
  font-weight: bold;
  margin-top: 2em
}

.formulario__input{
  border: 1px solid #000;
  padding: 0.5em;  
  width: 100%;
}

.formulario__input:hover{
  border: 1px solid #baa0d7;
}

.formulario__input:focus{
  border: 1px solid #baa0d7;
}

.formulario__submit{
  background: #baa0d7;
  border: none;
  border-radius: 2px;
  font-weight: bold;
  margin-top: 2em;
  padding: 0.5em 1.5em;
  text-align: center;
  transition: 100ms;
  width: 95%;  
}

.formulario__submit:hover{
  background: #553e6e;
  color: #fff;  
}

.formulario__erro{
  color: red;
  font-size: 0.8em;
}
</style>