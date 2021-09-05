<template>
    <div class="page-content">
        <section class="content-section">
            <span v-show="searchNotFound">Nenhum produto foi encontrado.</span>
            <div class="prodsBlock" v-for="prod in arBuild">
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

export default {
        data() {
        return{
            imgadd: imgadd,
            imgtrash: imgtrash,
            emptyCart: localStorage.Cart? false : true,
            searchNotFound: false,
            arBuild: [],
            // name, descr, price, id, img
            arProd: [
                {name:'Dolce Gusto Caffé Matinal',img:require('../assets/products/dolcegusto-caffematinal.webp'),descr:'Intensidade 9',price:23.9,id:0, outCart:true, qty:0},        
                {name:'Dolce Gusto Alpino',img:require('../assets/products/dolcegusto-alpino.webp'),descr:'Intensidade 8',price:23.9,id:1, outCart:true, qty:0},
                {name:'Dolce Gusto Caseiro Intenso',img:require('../assets/products/dolcegusto-caseirointenso.webp'),descr:'Intensidade 10',price:23.9,id:2, outCart:true, qty:0},
                {name:'Dolce Gusto Au Lait',img:require('../assets/products/dolcegusto-aulait.webp'),descr:'Café com leite',price:23.9,id:3, outCart:true, qty:0},
                {name:'Dolce Gusto Espresso',img:require('../assets/products/dolcegusto-espresso.webp'),descr:'Intensidade 8',price:23.9,id:4, outCart:true, qty:0},
                {name:'Melitta Sabor da Fazenda',img:require('../assets/products/melitta.jpg'),descr:'Intensidade 7',price:15.9,id:5, outCart:true, qty:0},
                {name:'Innovare Tradicional',img:require('../assets/products/innovare.jpg'),descr:'Intensidade 7',price:15.9,id:6, outCart:true, qty:0},
                {name:'Nespresso Colombia',img:require('../assets/products/colombiaespresso.jpg'),descr:'Intensidade 9',price:25.9,id:7, outCart:true, qty:0},
                {name:'Nespresso Cafézinho',img:require('../assets/products/nespresso-cafezinhodobrasil.webp'),descr:'Intensidade 5',price:25.9,id:8, outCart:true, qty:0},
                {name:'Caneca Sakura Starbucks',img:require('../assets/products/caneca01.jpg'),descr:'Material em cerâmica',price:55.9,id:9, outCart:true, qty:0},
                {name:'Caneca Preta',img:require('../assets/products/caneca-preta.webp'),descr:'Material em cerâmica',price:33.9,id:10, outCart:true, qty:0}
                ]
        }
    },

    created(){        
        this.arBuild = this.arProd;

        if(JSON.parse(window.sessionStorage.getItem("Cart")) !== ""){
            generateProductList();
        }
    },

    methods: {

       // products -> cart  @buildCart="buildCart()" @updateCart="updateCart()" @resetSessionCart="resetSessionCart()"
       // cart -> products addCart addProd  delProd editProdInput

        addCart: function (event) {   
            event.preventDefault();

            var i = this.findThisID(this.arBuild, event.target.id);

            this.arBuild[i].outCart = false;
            if (JSON.parse(window.sessionStorage.getItem("Cart")) !== ""){
                var arCart = JSON.parse(window.sessionStorage.getItem("Cart"));
                arCart.push({id:this.arBuild[i].id, qty:1, price:this.arBuild[i].price, name:this.arBuild[i].name, img:this.arBuild[i].img});
            } else {
                var arCart = [{id:this.arBuild[i].id, qty:1, price:this.arBuild[i].price, name:this.arBuild[i].name, img:this.arBuild[i].img}];
            }          
         
            window.sessionStorage.setItem("Cart", JSON.stringify(arCart));
            this.arBuild[i].qty = 1;
            //EMIT
    		this.$emit('buildCart');
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
            if(JSON.parse(window.sessionStorage.getItem("Cart")) !== ""){
                var arCart = JSON.parse(window.sessionStorage.getItem("Cart")),
                deletedIndex = this.findThisID(arCart, targetID);

                arCart.splice(deletedIndex, 1);

                window.sessionStorage.setItem("Cart", JSON.stringify(arCart));

                var i = this.findThisID(this.arBuild, targetID);
                this.arBuild[i].outCart = true;
                
                if(arCart.length === 0){
                    this.resetSessionCartProd();
                } else {
                    if(deletedIndex < 2){
                        //EMIT
    		            this.$emit('buildCart');
                    }else{
                        //EMIT
    		            this.$emit('updateCart');     
                    }
                }
            }
        },

        resetSessionCartProd: function(){
            this.arBuild = this.arProd;
            //EMIT
    		this.$emit('resetSessionCart');
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

            var arCart = JSON.parse(window.sessionStorage.getItem("Cart"));
            
            var i = this.findThisID(arCart, targetID);

            if(newQty === -100){
                if(arCart[i].qty === 15){
                    alert("Limite de 15 unidades por cliente.");
                    newQty = 15;
                }else{
                    newQty = arCart[i].qty + 1;
                }
            } else if(newQty === 0) {
                this.delProdTrashCan(targetID);
                return;
            }

            arCart[i].qty = newQty;
            this.arBuild[this.findThisID(this.arBuild, targetID)].qty = newQty;
            
            window.sessionStorage.setItem("Cart", JSON.stringify(arCart));

            //EMIT
            this.$emit('updateCart');    
        },

        generateProductList: function () {  
            var arGenSearch = [];
            arGenSearch = JSON.parse(window.sessionStorage.getItem("Search"));
            
            if(arGenSearch === "notfound"){
                this.searchNotFound = true;
                this.arBuild = "";
            } else if (arGenSearch === ""){
                this.searchNotFound = false;
                this.arBuild = this.arProd;
            } else {
                this.arBuild = [];
                for (var i = 0; i < arGenSearch.length; i++) {
                    for (var x = 0; x < this.arProd.length; x++){
                        if (arGenSearch[i].id === this.arProd[x].id) {
                            if(this.arBuild){
                                this.arBuild.push(this.arProd[x]);
                            } else {
                                this.arBuild = this.arProd[x];
                            }
                        }
                    }
                }
                this.searchNotFound = false;
            }

            if (this.arBuild !== ""){
                if(JSON.parse(window.sessionStorage.getItem("Cart")) !== ""){
                    var arCart = JSON.parse(window.sessionStorage.getItem("Cart"));
                    for(var i = 0; i < arCart.length; i++){
                        var x = this.findThisID(this.arBuild, i);
                        if (this.arBuild[x].id == (arCart[i].id).toString()){
                            this.arBuild[x].outCart = false;
                            this.arBuild[x].qty = arCart[i].qty;
                        }
                    }     
                    //EMIT
                    this.$emit('buildCart');       
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