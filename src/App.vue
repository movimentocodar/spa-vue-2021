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

    <footer class="rodape">
        <p class="rodape--texto">2021 &copy; Todos os direitos reservados. Developed by Fernanda Beato.</p>
    </footer>
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


.carrinho__produtos-selecionados li{
  list-style-type:none;
}

.produto-selecionado{
  margin-top: 0.5em;
}

.produto-selecionado__imagem{
  margin-right: 0.5em;
  width: 5em;
  vertical-align: middle;
}

.produto-selecionado__nomeEQuantidade{
  display: inline-block;
}

.produto-selecionado__nomeEQuantidade__titulo{    
  font-weight: bold;
  margin: 0;
}
.produto-selecionado__nomeEQuantidade__quantidade{
  padding-top: 0.2em;
  margin:0;
}

.produto-selecionado__deletar{
  float: right;
  padding: 1em;
  width: 1.2em;
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
