<template>
    <header class="cabecalho">
        <div class="cabecalho__conteudo">
            
            
        </div>
    </header>
</template>

<script>
export default {
    data(){
        return{
            name: 'menu'
        }
    }    
}
</script>

<style scoped>
.cabecalho{
    border-bottom: 2px solid #ccc;
    width: 100%;
}

.cabecalho__conteudo{
    margin: 0 auto;
    padding: 2em;
    position: relative;    
    width: 940px;
}



.cabecalho__menu{
    position: absolute;
    right: 0;
    top: 1em;    
}

.cabecalho__menu ul li{
    display: inline-block;
    list-style-type:none;
    vertical-align: middle;
}

.cabecalho__menu__img-perfil{
    width: 3em;
}

.cabecalho__menu__nome-perfil{
    font-weight: bold;
}
</style>