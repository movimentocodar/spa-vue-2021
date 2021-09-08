<template>
    <div class="page-content">
        <section class="content-section">
            <span v-show="searchNotFound">Nenhum produto foi encontrado.</span>
            <div class="prodsBlock" v-for="prod in arBuild" :key="prod.id">
                <div class="div-prod">
                    <img :src="prod.img" class="img-prod">
                    <span class="prod-name">{{ prod.name }}</span>
                    <span class="prod-descr">{{ prod.descr }}</span>
                    <p class="prod-price">R$ {{ prod.price }}</p>
                    <span :id="prod.id" data-opt-prod>
                        <button :id="prod.id" class="addcart-button" @click="addCart" v-show="prod.outCart" data-add-cart>Adicionar no carrinho</button>
                        <input :id="prod.id" type="number" v-model:value="prod.qty" class="input-prod-qty" v-show="!prod.outCart" data-input-prod @change="editProdInput"/>
                        <input type="image" :id="prod.id" class="add-prod-qty" :src="imgadd" v-show="!prod.outCart" data-btn-add-prod @click="addProd" />
                        <input type="image" :id="prod.id" class="del-prod" :src="imgtrash" v-show="!prod.outCart" data-btn-del-prod @click="delProd"  />
                    </span>
                </div>    
            </div>
        </section>
    </div>
</template>

<script>
import imgadd from '../assets/add.png';
import imgtrash from '../assets/trash-can.png';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return{
            cartnumber: 0,
            imgadd: imgadd,
            imgtrash: imgtrash,
            searchNotFound: false,
            arBuild: [],
            arCart: [],
            arGenSearch: ""
        }
    },

    computed: {
        ...mapGetters({
        search: 'getSearch',
        cart: 'getCart',
        numcart: 'getNumCart',
        arprod: 'getArProd'
        }),
    },

    created(){        
        this.arBuild = this.arprod.map(el => { return {...el} });
        this.arCart = this.cart;

        this.generateProductList();
    },

    watch: {
        'search': function () {
            this.generateProductList();
        },

        'cart': function (newCart, oldCart) {
            this.arCart = newCart;
            this.generateProductList();
        },
        
        'numcart': function (newN, oldN) {
            this.cartnumber = newN;
            this.generateProductList();
        },
    },

    methods: {

        addCart: function (event) {   
            event.preventDefault();

            var i = this.findThisID(this.arBuild, event.target.id);

            this.arBuild[i].outCart = false;
            if (this.arCart !== ""){
                this.arCart.push({id:this.arBuild[i].id, qty:1, price:this.arBuild[i].price, name:this.arBuild[i].name, img:this.arBuild[i].img});
            } else {
                this.arCart = [{id:this.arBuild[i].id, qty:1, price:this.arBuild[i].price, name:this.arBuild[i].name, img:this.arBuild[i].img}];
            }          
        
            this.arBuild[i].qty = 1;

            this.$store.dispatch("changeCart",this.arCart);
        },

        addProd: function (event) { 
            event.preventDefault();
            this.editProd(-100, event.target.id);
        },

        delProd: function (event) { 
            event.preventDefault();
            this.delProdTrashCan(event.target.id);
        },

        delProdTrashCan: function (targetID) { 
            if(this.arCart !== ""){
                var arBuildIndex = this.findThisID(this.arBuild, targetID);
                this.arBuild[arBuildIndex].outCart = true;

                var deletedIndex = this.findThisID(this.arCart, targetID);
                this.arCart.splice(deletedIndex, 1);

                this.$store.dispatch("changeCart",this.arCart);

                if(this.arCart.length === 0){
                    this.resetSessionCart();
                } 
            }
        },

        resetSessionCart: function(){
            this.$store.dispatch("changeCart",[]);
            this.$store.dispatch("changeNumCart",0);
        },

        editProdInput: function (event) { 
            event.preventDefault();
            var eventTarget = event.target;
            var reg = new RegExp('[0-9](([0-8](\.[0-9]*)?)|[0-9])?');

            if(eventTarget.value.match(reg)){
                var inputQty = parseInt(eventTarget.value);

                if(!(inputQty < 0)){
                    if(inputQty <= 15){                
                        this.editProd(inputQty, eventTarget.id);
                    } else {
                        
                        if(confirm('Limite de 15 unidades por cliente. Deseja incluir 15 unidades no carrinho?')){
                            this.editProd(15, eventTarget.id);
                        } else {
                            this.editProd(1, eventTarget.id);
                        }

                    }
                }else{
                    alert("A quantidade não pode ser negativa.");
                    this.arBuild[(this.findThisID(this.arBuild, eventTarget.id))].qty = 1;
                    this.editProd(1, eventTarget.id);  
                }
            }else{
                alert("Utilizar somente números.");
                this.editProd(1, eventTarget.id);
            }
        },

        findThisID: function(thisArray, eventID){
            if(thisArray){
                for(var i = 0; i < thisArray.length; i++){
                    if(thisArray[i].id.toString() === eventID.toString()){
                        return i;
                    }         
                } 
            }
             
        },

        editProd: function(newQty, targetID){
            event.preventDefault();
           
            var i = this.findThisID(this.arCart, targetID);

            if(newQty === -100){
                if(this.arCart[i].qty === 15){
                    alert("Limite de 15 unidades por cliente.");
                    newQty = 15;
                }else{
                    newQty = this.arCart[i].qty + 1;
                }
            } else if(newQty === 0) {
                this.delProdTrashCan(targetID);
                return;
            }

            this.arCart[i].qty = newQty;
            this.arBuild[this.findThisID(this.arBuild, targetID)].qty = newQty;
            
            this.$store.dispatch("changeCart",this.arCart.map(el => { return {...el} }));
        },

        generateProductList: function () {  
            this.arGenSearch = this.search;
            
            if(this.arGenSearch === "notfound"){
                this.searchNotFound = true;
                this.arBuild = "";
            } else if (this.arGenSearch === ""){
                this.searchNotFound = false;
                this.arBuild = this.arprod.map(el => { return {...el} });
            } else {
                this.arBuild = [];
                for (var i = 0; i < this.arGenSearch.length; i++) {
                    for (var x = 0; x < this.arprod.length; x++){
                        if (this.arGenSearch[i].id === this.arprod[x].id) {
                            if(this.arBuild){
                                this.arBuild.push(this.arprod[x]);
                            } else {
                                this.arBuild = this.arprod[x];
                            }
                        }
                    }
                }
                this.searchNotFound = false;
            }
            
            if (this.arBuild.length > 0){
                if(this.arCart.length > 0){
                    for(var i = 0; i < this.arBuild.length; i++){
                        var x = this.findThisID(this.arCart, this.arBuild[i].id);
                        if (x !== undefined){
                            this.arBuild[i].outCart = false;
                            this.arBuild[i].qty = this.arCart[x].qty.toString();
                        } else {
                            this.arBuild[i].outCart = true;
                            this.arBuild[i].qty = 0;
                        }
                    }    
                }
            }
        }
    }
}

</script>

<style scoped>

.page-content{
	background: #EDE8DB;
}

.content-section{
	width: 940px;
	height: auto;
	margin: 0 auto;
	padding: 70px 0;
}

.prod-price, .prod-price-cart{
	font-family: 'Bebas Neue', sans-serif;
	font-size:22px;
	text-align:center;
	padding: 5px 0px;
}

/*Produto*/

.prodsBlock{
    display: inline-table;
}

.div-prod{
	background-color:#FBF8EF;
	width:195px;
	height:293px;
	border-bottom: 8px solid #C49664;
	padding:20px 30px 30px 30px;
    margin:0 15px 40px 15px;
    display: block;
}

.prod-descr, .prod-name{
	font-size:14px;
	text-align:center;
	padding: 5px 0px;
    display: block;
}

.prod-name{
	font-weight:bold;
    display: block;
}

.div-prod:hover{
	background-color:#FFFFFF;
	transition: 0.5s;
}

.img-prod{
	padding:20px 35px;
	width:128px;
	height:143px;
    display: block;
}

</style>