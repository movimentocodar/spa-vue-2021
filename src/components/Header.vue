<template>
    <div class="header">
        <router-link :to="{name: 'Home'}"><h1>Ibuy</h1></router-link>
        <search-bar :items="items" class="search"></search-bar>
        <div class="info">
            <carrinho class="carrinho"></carrinho>
            <contato class="contato"></contato>
        </div>
        <profile></profile>
    </div>
</template>

<script>
import Search from './sub-components/Search.vue'
import Carrinho from './sub-components/Carrinho.vue'
import Profile from './sub-components/Profile.vue'
import Contato from "./sub-components/Contato.vue";
import ItemsDb from '../database/Items.json'

export default {
    data(){
        return{
            "items": ItemsDb
        }
    },

    components:{
        "search-bar": Search,
        "carrinho" : Carrinho,
        "profile" : Profile,
        "contato" : Contato
    },

}
</script>
<style scoped>
h1 {
    font-size: 40px;
    margin: 10px;
}

.carrinho {
    display: inline;
    margin-right: 30px;
}

.contato {
    display: inline;
}

.info {
    min-width: 125px;
    margin-left: 60px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    padding-right: 20px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: steelblue;
    color: white;
}

a{
    text-decoration: none;
    color: white;
    font-weight: bold;
} 

a:visited{
    text-decoration: none;
    color: white;
}
</style>
