<template>
  <div id="home">
    <div class="item-menu">
      <label-category title="Destaques"></label-category>
      <span v-for="(itemsdb) in items" :key="itemsdb._key">
        <shopcard :nome="itemsdb.nome" :preco="itemsdb.preco" :estoque="itemsdb.estoque" :imagem="itemsdb.imagem" :_key="itemsdb._key"></shopcard>
      </span>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import ShopItems from '../components/ShopItems.vue'
import ItemsDb from '../database/Items.json'
import LabelCategoria from '../components/sub-components/LabelCategoria.vue'
import Footer from '../components/Footer.vue'

export default {
  data(){
    return{
      "items": ItemsDb,
    }
  },

  components:{
    "shopcard": ShopItems,
    "label-category": LabelCategoria,
    "footer-component": Footer
  }
}
</script>

<style scoped>
.item-menu{
  width: 848px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 70px;
}
</style>
