<template>
  <div class="home">
    <div class="destaques">
      <h2 class="destaques__titulo">Destaques</h2>
      <input type="search" class="destaques__busca" placeholder="Busque pelo nome" />
    </div>
    <div class="main">
      <Produtos />
      <Carrinho />
    </div>
    <footer class="rodape">
        <p class="rodape--texto">2021 &copy; Todos os direitos reservados. Developed by Fernanda Beato.</p>
    </footer>
  </div>
</template>

<script>
import Produtos from '@/components/Produtos.vue';
import Carrinho from '@/components/Carrinho.vue';

export default {
  name: 'Home',
  components: {
    Produtos,
    Carrinho
  }
}
</script>

<style scoped>
.main{
  display: flex;
}

.destaques{
  padding: 0 2.5em;
}

.destaques__titulo{
    font-weight: bold;
    font-size: 2em;
    padding: 0.5em 0;
    margin: 0;
}

.destaques__busca{
    margin: 0 0 1em 0.5em;
    padding: 0.5em;    
    width: 60%;
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