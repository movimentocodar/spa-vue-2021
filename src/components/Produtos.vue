<template>
    <div>
        <subtitle :pagetitle="'Produtos'" :visivel="true" v-on:generateProductList="generateProductList()"></subtitle>      
        <productsList></productsList>
    </div>
</template>

<script>
import productsList from '../components/ProductsList.vue';
import pageSubtitle from '../components/Subtitle.vue';

export default {
    components: {
        "subtitle": pageSubtitle,
        "productsList": productsList,
    },

    generateProductList: function (event) {   
	  this.$refs.productsList.generateProductList();		
	},
}

</script>

<style>
</style>