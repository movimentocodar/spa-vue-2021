<template>
    <div class="search" >
        <input @blur="limpar()" type="search" class="search-input" v-model="filtro"  @input="filtro = $event.target.value" placeholder="Busque aqui">
            <div class="list-group">
                <div v-for="itens of search" :key="itens._key" class="itemdropdown">
                    <router-link @mousedown.native="gotoroute(itens._key)" :to="{name: 'PreCarrinho', params: {qnt: 1, id: itens._key}}" ><img class="item-icon" :src="itens.imagem"><span class="short">{{ itens.nome }}</span></router-link>
                </div>
            </div>
        <button><img class="btn-busca" src="https://image.flaticon.com/icons/png/512/16/16492.png"></button>
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
                return Object.values(this.items).filter(item => exp.test(item.nome))
            }else{
                return;
            }
            
        }
        
    },

    methods: {
        limpar(){
           this.filtro = ''
        },
        
        gotoroute(key){
            this.$router.push({
            name: 'PreCarrinho', 
            params: { qnt: 1, id: key}
        });
        }
    }
}
</script>
<style scoped>
.search-input{
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

.item-icon {
    width: 45px;
    margin-right: 10px;
}

.btn-busca{
    width: 18px;
    filter: invert(95%);
    padding-top: 5px;
}

button{
    padding: 0;
    height: 30px;
    width: 35px;
    position: absolute;
    background-color: rgb(44, 68, 141);
    border: none;
}

button:hover{
    cursor: pointer;
    background-color: rgb(55, 85, 175);;
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
}

.itemdropdown:hover{
    background-color: rgb(240, 240, 240);
    cursor: pointer;
}
</style>
