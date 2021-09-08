<template>
    <div>
        <img src="../assets/cart.png" class="img-cart-appen">
        <div class="cart">
            <Table>
                <tr>
                    <td class="prod-cart-close"><button class="close-prod" data-close-cart @click="ButtonHiddenCart"><p class="close-cart">X</p></button></td>
                </tr>
                <tr>
                    <td>
                        <div class="prod-name-cart" data-cart-message> Não há nada no carrinho</div>
                        <div data-cart-content style="display:none;">
                            <div v-for="cart in arHeaderCart" :key="cart.id">
                                <table>
                                    <tr><td colspan="2" class="prod-name-cart">{{ cart.name }}</td></tr>
                                    <tr>
                                        <td class="prod-cart"><img :src="cart.img" class="img-prod-cart"></td>
                                        <td class="prod-cart-add">
                                            <input :id="cart.id" class="input-prod-qty-cart" type="number" v-model:value="cart.qty" data-input-prod @change="editProdInput" />
                                            <input type="image" :id="cart.id" class="add-prod-qty" :src="imgadd" data-btn-add-prod  @click="addProd" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="prod-descr-cart">
                                            <p :id="cart.id" class="prod-qty" data-cart-qty>{{ cart.qty }} un.</p>
                                            <p :id="cart.id" class="prod-price-cart" data-cart-price>R$ {{ cart.price }}</p>
                                            <input type="image" :id="cart.id" class="del-prod-cart" :src="imgtrash" @click="delProd" data-btn-del-prod />
                                        </td>
                                    </tr>
                                    <tr><td colspan="2"><div class="cart-line"></div></td></tr>
                                </table>
                            </div>
                        </div>
                        <div class="prod-name-cart">
                            <div data-div-cart-buttons style="display:none;">
                                <div class="prod-itens" data-cart-qtd style="display:none;">{{ totalitem }}</div>
                                <div class="prod-itens">Total: <p class="prod-price-cart" data-total-price>{{ totalprice }}</p></div>
                                <div><button class="viewcart-button" data-view-cart @click="resetSessionCart">Visualizar carrinho</button></div>
                            </div>
                        </div> 
                    </td>
                </tr>
            </table>            
        </div> 
    </div>
</template>

<script>
import imgadd from '../assets/add.png';
import imgtrash from '../assets/trash-can.png';
import { mapState, mapActions, mapGetters } from 'vuex';
import modProd from "../api/prod.js";

export default {
    data(){
        return{
            imgadd: imgadd,
            imgtrash: imgtrash,
            cartnumber: 0,
            totalitem:0,
            totalprice: 0,
            arCart: [],
            arHeaderCart: []
        }
    },

    computed: {
        ...mapGetters({
        numcart: 'getNumCart',
        cart: 'getCart',
        arprod: 'getArProd'
        }),
    },

    watch: {
        'cart': function (newCart, oldCart) {
            this.arCart = newCart;
            console.log("watcher cart do cart");
            this.buildCart();
        },
        
        'numcart': function (newN, oldN) {
            this.cartnumber = newN;
            console.log("watcher numcart do cart");
            this.buildCart();
        },
    },

    methods:{
        checkCart: function () {
            const divCartMessage = document.querySelector('[data-cart-message]'),
            divCartContent = document.querySelector('[data-cart-content]'),
            divCartButtons = document.querySelector('[data-div-cart-buttons]'),
            showTotalItem = document.querySelector('[data-cart-qtd]');

            if(this.arCart.length < 1){
                divCartMessage.style.display = "block";
                divCartContent.style.display = "none";
                divCartButtons.style.display = "none";
                showTotalItem.style.display = "none";
            }else {
                if(this.arCart.length > 2){
                    showTotalItem.style.display = "block";
                } else {
                    showTotalItem.style.display = "none";
                }
                divCartMessage.style.display = "none";
                divCartContent.style.display = "block";
                divCartButtons.style.display = "block";
            }
        },

        buildCart: function () {
            console.log("build cart");
            if(this.arCart !== ""){
                this.totalitem = 0;
                this.totalprice = 0;
                this.cartnumber = 0;

                for(var i = 0; i < this.arCart.length; i++){
                    var qtyitem = parseInt(this.arCart[i].qty) + parseInt(this.cartnumber);

                    this.cartnumber = qtyitem;

                    var price = parseFloat(this.arprod[this.arCart[i].id].price),
                    qty = parseFloat(this.arCart[i].qty);

                    var totalprodprice = price * qty;
                    this.arCart[i].price = totalprodprice.toFixed(2);

                    var totalpr = parseFloat(this.totalprice) + parseFloat(this.arCart[i].price);
                    
                    this.totalprice = totalpr;

                    if(i === 0){
                        this.arHeaderCart[0] = this.arCart[0];
                    }
                    if (i === 1){
                        this.arHeaderCart[1] = this.arCart[1];                     
                    }
                }

                if (this.arCart.length < 2){
                   this.arHeaderCart.splice(1, 1);  
                }

                this.$store.dispatch("changeCart",this.arCart);
                this.$store.dispatch("changeNumCart",this.cartnumber);

                this.totalprice = this.addRS(parseFloat(this.totalprice));

                if(this.arCart.length > 2){        
                    var totalDisplay = parseInt(this.arHeaderCart[0].qty) + parseInt(this.arHeaderCart[1].qty);
                    
                    var ntotalitem = parseInt(this.cartnumber) - totalDisplay;

                    if(parseInt(ntotalitem) > 1){
                        this.totalitem = "+ " + ntotalitem.toString() + " itens";
                    }else {
                        this.totalitem =  "+ 1 item";
                    }
                }
            }
            
            this.checkCart();
        },

        addRS: function (price) {
            return "R$ " + price.toFixed(2).toString();
        },

        resetSessionCart: function(){
            console.log("reset session cart cart");
            this.arHeaderCart = [];
            this.arCart = [];
            this.cartnumber = 0;

            this.$store.dispatch("changeCart","");
            this.$store.dispatch("changeNumCart",0);
            //PORQUE NESSE PONTO NÃO ATIVA OS WATCHERS?

            this.checkCart();
        },

        addProd: function (event) { 
            console.log("add prod cart");
            event.preventDefault();
            this.editProd(-100, event.target.id);
        },

        delProd: function (event) { 
            console.log("del prod cart");
            event.preventDefault();
            this.delProdTrashCan(event.target.id);
        },

        delProdTrashCan: function (targetID) { 
            console.log("del prod trashcan cart");
            if(this.arCart !== ""){
                var deletedIndex = this.findThisID(this.arCart, targetID);

                this.arCart.splice(deletedIndex, 1);

                if(this.arCart.length === 0){
                    this.resetSessionCart();
                } 

                this.$store.dispatch("changeCart",this.arCart);

                this.buildCart();
            }
        },

        editProdInput: function (event) { 
            console.log("edit prod input cart");
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
            console.log("edit prod cart");
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
            
            this.$store.dispatch("changeCart",this.arCart);
            this.buildCart();
        },

        ButtonHiddenCart: function (event) {
            this.$store.dispatch("changeShowCart",false);
            event.preventDefault();
        }
    }
}
</script>

<style>

</style>