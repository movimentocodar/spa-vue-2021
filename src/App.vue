<template>
  <div id="app">
    <div class="cabecalho">

      <h1><img src="./assets/logo.png" class="cabecalho__conteudo__logo"></h1>
      <div id="nav">        
        <router-link to="/">Home</router-link> |
        <router-link to="/contato">Contato</router-link>
      </div>
      <nav class="cabecalho__menu">
        <ul>
          <li><img src="imagens/perfil.png" class="cabecalho__menu__img-perfil"></li>
          <li><p class="cabecalho__menu__nome-perfil">Admin</p></li>
        </ul>
      </nav>

    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
body{
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    padding:0;
    margin:0;
}

.cabecalho{
  display: flex;
  justify-content: space-around;
  align-items: center;
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
}

.cabecalho__menu__nome-perfil{
    font-weight: bold;
}
</style>
