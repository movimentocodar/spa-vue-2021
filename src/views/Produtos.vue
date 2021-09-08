<template>
    <div>
        <subtitle :pagetitle="'Produtos'" :visivel="true"></subtitle>      
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
}

</script>

<style>
</style>