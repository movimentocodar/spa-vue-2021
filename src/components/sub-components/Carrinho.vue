<template>
    <div>
        <router-link :to="{name: 'CarrinhoCompra'}" ><img class="invert" src="https://image.flaticon.com/icons/png/512/126/126510.png"><span>1</span></router-link>
    </div>
</template>

<style scoped>
a{
    width: 50px;
    height: 50px;
    margin: 5px;
    background: transparent;
    border: none;
}

a:hover{
    cursor: pointer;
}

span{
    background-color: tomato;
    position: absolute;
    color: white;
    /* display: inline-block; */
    width: 20px;
    height: 20px;
    border-radius: 10px;
    line-height: 18px;
    display: none;

}

img{
    width: 30px;
    height: 30px;
}

.invert{
    filter: invert(100%);
}
</style>