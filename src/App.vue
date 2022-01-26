<template>
  <div id="home">
    <div id="nav">
      <header-component></header-component>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components:{
    'header-component': Header
  },

  data(){
    return{
    }
  },
}
</script>
<style>
@media (max-width: 500px) {
  body {
    width: fit-content;
  }
}
</style>
