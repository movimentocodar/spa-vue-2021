<template>
    <div class="card">
        <h2>{{ title }}</h2>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style scoped>
.card {
    background-color: transparent;
    height: 40px;
    border-top: 4px solid steelblue;
    border-bottom: 4px solid steelblue;
    text-align: center;

}

h2{
    line-height: 40px;
    font-weight: bold;
    font-size: 22px;
    font-family: Arial, Helvetica, sans-serif;
    color: steelblue;
}
</style>
