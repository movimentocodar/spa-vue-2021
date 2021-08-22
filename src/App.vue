<template>
  <div id="app">
    <div class="cabecalho">

      <h1><img src="./assets/logo.png" class="cabecalho__conteudo__logo"></h1>
      <div id="nav" class="navegacao">        
        <router-link to="/">Home</router-link> |
        <router-link to="/contato">Contato</router-link>
      </div>
      <nav class="cabecalho__menu">
        <ul>
          <li><img :src="user.avatar_url" class="cabecalho__menu__img-perfil"></li>
          <li><p class="cabecalho__menu__nome-perfil">{{ user.name }}</p></li>
        </ul>
      </nav>
    </div>
    <router-view/>

    <footer class="rodape">
        <p class="rodape--texto">2021 &copy; Todos os direitos reservados. Developed by Fernanda Beato.</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "User",
   data() {
     return {
       user: {},
     };
   },
   created() {
     this.getUser();
   },
   methods: {
     getUser() {
       axios
         .get("https://api.github.com/users/feehvecch")
         .then((response) => {
           this.user = response.data;
         })
         .catch((error) => {
           console.log(error);
         });
     },
   }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
body{
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  padding:0;
  margin:0;
}

.navegacao{
  color: #553e6e;
  font-size: 1.2em;
  font-weight: bold;  
}

.cabecalho{
  align-items: center;
  display: flex;
  justify-content: space-around;  
}

.cabecalho__conteudo__logo{
  height: auto;
  width: 200px;    
}

.cabecalho__menu ul{
  align-items: center;
  display: flex;
  list-style-type:none;
}

.cabecalho__menu__img-perfil{
  width: 3em;
  border-radius: 50%;
}

.cabecalho__menu__nome-perfil{
  font-weight: bold;
}

.rodape{
  background: rgb(63, 63, 63);
  color: #fff;
  clear: left;
  font-size: 0.8em;
  text-align: center;    
  padding: 2em;
}

.rodape p{
  margin:0;
}
</style>
