<template>
    <div class="item">
        <img data-img-item :src="imagem" :alt="nome">
        <div class="item-name">{{ nome }}</div><br>
        <span class="item-preco" data-item-preco>{{ preco }}</span><br>
        <div>Disponivel: {{ estoque }} unid.</div>
        <input @change="checkinput(quantidade, estoque)" class="item-input" type="number" min="1" :max="estoque" v-model="quantidade">
        <router-link :to="{name: 'PreCarrinho', params: {qnt: quantidade, id: _key}}"><btn-comprar></btn-comprar></router-link>
    </div>
</template>

<script>
import BotaoComprar from './sub-components/BotaoCompra.vue'

export default {
    components:{
        "btn-comprar": BotaoComprar
    },
    props: {
        nome:{
            type: String,
            require: true
        },
        preco: {
            type: String,
            require: true
        },
        estoque: {
            type: Number,
            require: true
        },
        imagem: {
            type: String,
            require: true
        },
        _key: {
            type: Number,
            require: true
        }
    },
    data(){
        return{
            quantidade: 1,
            warning: 'Quantidade invalida!',
        }
    },

    methods: {
        checkinput(quantidade, estoque){
            if (quantidade < 1 || quantidade > estoque){
                alert('Quantidade Invalida!')
                this.quantidade = 1
            }
        }
    }
}
</script>

<style scoped>
.item {
    width: 200px;
    text-align: center;
    border: 1px solid steelblue;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px 5px 0 0;
    margin: 5px;
    border-bottom: none;
    display: inline-block;
}

img{
    width: 175px;
}

.item-name {
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 0 10px 0 10px;
    height: 38px;
}

.item-preco{
    display: block;
}

.item-input{
    width: 40px;
    height: 20px;
    margin: 5px;
}

.item-preco::before {
    content: "R$ ";
}
</style>
