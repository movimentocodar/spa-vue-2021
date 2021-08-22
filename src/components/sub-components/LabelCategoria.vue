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
    background-color: steelblue;
    border: 1px solid red;
    height: 40px;
    border: 1px solid royalblue;
    text-align: center;
    border-radius: 5px;
}

h2{
    line-height: 40px;
    font-weight: bold;
    font-size: 22px;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
}

</style>