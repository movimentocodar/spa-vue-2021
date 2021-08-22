<template>
  <div id="app">
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
  }
  
}
</script>

<style>

</style>
