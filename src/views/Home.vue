<template>
  <div class="home">
    
    <div class="main">
      <Produtos />
      <Carrinho />
    </div>
    
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

</style>