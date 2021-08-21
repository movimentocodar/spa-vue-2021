<template>
    <section class="carrinho">
        <h3 class="carrinho__titulo">{{ name }}</h3>
        
        <p class="carrinho__valor-total"></p>
        <p class="carrinho__quantidade-total"></p>
        <input class="carrinho__finalizar" type="submit" value="Finalizar" />
    </section>
</template>

<script>
export default {
    data(){
        return{
            name: 'Carrinho'
        }
    }
}
</script>

<style scoped>
.carrinho{
    background: #baa0d7;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1em 0;
    width: 35%;
}

.carrinho__titulo{
    background: #553e6e;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 0;
    padding: 1em;
}

.carrinho__valor-total{
    font-weight: bold;
    padding: 0 1.5em;
}

.carrinho__valor-total span{
    font-weight: normal;
}

.carrinho__quantidade-total{
    font-weight: bold;
    padding: 0.5em 1.5em;
}

.carrinho__quantidade-total span{
    font-weight: normal;
}

.carrinho__finalizar{
    background: rgb(63, 63, 63);
    border: 2px solid rgb(63, 63, 63);
    border-radius: 2px;
    color: #fff;
    font-size: 1em;
    font-weight: bold;
    margin: 1em 0 0 0;    
    padding: 1em; 
    transition: 100ms;   
    width: 100%;
}

.carrinho__finalizar:hover{
    background: #fff;
    color: #553e6e;
    border: 2px solid #553e6e;
}
</style>