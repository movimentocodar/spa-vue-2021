<template>
    <div class="search">
        <input type="search" class="input" v-model="filtro"  @input="filtro = $event.target.value" placeholder="Busque aqui">
            <div class="list-group">
                <div @click="limpar()" v-for="itens of search" :key="itens._key" class="itemdropdown">
                    <router-link :to="{name: 'PreCarrinho', params: {qnt: 1, id: itens._key}}" :key="$route.fullPath" ><img :src="itens.imagem"><span class="short">{{ itens.nome }}</span></router-link>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    props: ['items'],
    data(){
        return{
            filtro: '',
        }
    },

    computed:{
        search(){
            if(this.filtro){
                let exp = new RegExp(this.filtro.trim(), 'i');
                console.log(exp)
                return Object.values(this.items).filter(item => exp.test(item.nome))
            }else{
                return;
            }
            
        }
        
    },
    methods: {
        limpar(){
            this.filtro = ''
        }
    }
}
</script>
<style scoped>
.input{
    width: 300px;
    height: 30px;
}

.list-group{
    position: absolute;
    background-color: white;
    width: 300px;
    
}

.short{
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 80%;
}

img {
    /* border: 1px solid red; */
    width: 45px;
    margin-right: 10px;
}

a{
    text-decoration: none;
    line-height: 45px;
    width: 100%;
    color: black;
}

a:visited{
    color: black;
}


.itemdropdown{
    border-radius: 3px;
    height: 45px;
    border: 1px solid steelblue;
    display: flex;
    margin: auto;
    /* line-height: 45px; */
}

.itemdropdown:hover{
    background-color: rgb(240, 240, 240);
    cursor: pointer;
}

</style>