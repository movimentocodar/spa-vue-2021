<template>
    <div>
        <router-link :to="{name: 'Contato'}"><img class="invert" src="https://www.inhouse.com.br/wp-content/uploads/2018/10/headset.png"></router-link>
    </div>
</template>

<style scoped>
button{
    width: 50px;
    height: 50px;
    margin: 5px;
    background: transparent;
    border: none;
}

button:hover{
    cursor: pointer;
}

img{
    width: 30px;
    height: 30px;
}

.invert{
    filter: invert(100%);
}
</style>