<template>
    <div>
        <span v-for="n in 5" :key="n">
            <span v-if="n <= stars">
                <img class="yellow" src="https://image.flaticon.com/icons/png/512/929/929424.png">
            </span>
            <span v-else>
                <img class="cinza" src="https://image.flaticon.com/icons/png/512/929/929495.png">
            </span>
        </span>
    </div>
</template>

<script>
export default {
    props:['stars']

}
</script>

<style scoped>

img {
    width: 20px;
    margin: 2px;
}

.cinza {
    filter: invert(70%)
}

</style>