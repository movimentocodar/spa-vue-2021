<template>
    <div v-show="showCart">
        <img src="../assets/cart.png" class="img-cart-appen">
        <div class="cart">
            <div class="prod-cart-close"><button class="close-prod" data-close-cart ><!--@click="ButtonHiddenCart"--><p class="close-cart">X</p></button></div>
            <div class="prod-name-cart" v-show="emptyCart" data-cart-content> Não há nada no carrinho</div>
            <div  v-show="!emptyCart">
                <div v-for="cart in arHeaderCart">
                    <table>
                        <tr><td colspan="2" class="prod-name-cart">{{ cart.name }}</td></tr>
                        <tr>
                            <td class="prod-cart"><img :src="cart.img" class="img-prod-cart"></td>
                            <td class="prod-cart-add">
                                <input :id="cart.id" class="input-prod-qty-cart" type="number" value="cart.qty" data-input-prod />
                                <input type="image" :id="cart.id" class="add-prod-qty" src="imagens/add.png" data-btn-add-prod />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="prod-descr-cart">
                                <p :id="cart.id" class="prod-qty" data-cart-qty>{{ cart.qty }} un.</p>
                                <p :id="cart.id" class="prod-price-cart" data-cart-price>R$ {{ cart.price }}</p>
                                <input type="image" :id="cart.id" class="del-prod-cart" src="imagens/trash-can.png" data-btn-del-prod />
                            </td>
                        </tr>
                        <tr><td colspan="2"><div class="cart-line"></div></td></tr>
                    </table>
                </div>
            </div>
            <div class="prod-name-cart" v-show="!emptyCart">
                <div class="hidebuttons" data-div-cart-buttons>
                    <div class="prod-itens" data-cart-qtd v-show="showTotalItem"><div class="hidebuttons" data-cart-qtd>{{ totalitem }}</div>
                    <div class="prod-itens">Total: <p class="prod-price-cart" data-total-price>{{ totalprice }}</p></div>
                    <div><button class="viewcart-button" data-view-cart>Visualizar carrinho</button></div>
                </div>
            </div> 
        </div> </div>
    </div>
</template>

<script>
import productsList from '../components/ProductsList.vue';

export default {
    data(){
        return{
            showCart: false,
            emptyCart: localStorage.Cart!==""? false : true,
            cartnumber: 0,
            totalitem:0,
            totalprice: 0,
            showTotalItem: false,
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
                ],
            arHeaderCart: JSON.parse(window.sessionStorage.getItem("Cart"))
        }
    },

    

    destroyed(){
        window.removeEventListener("resize", this.positionCart);
    },

    methods:{
        // products -> cart  @buildCart="buildCart()" @updateCart="updateCart()" @resetSessionCart="resetSessionCart()"
        // cart -> products addCart addProd  delProd editProdInput

        buildCart: function () {
            if(JSON.parse(sessionStorage.getItem("Cart")) !== ""){
                var arCart = JSON.parse(sessionStorage.getItem("Cart"));

                for (var i = 0; i < arCart.length; i++) {
                    if(i == 0){
                        this.emptyCart = false;
                        this.arHeaderCart[0] = arCart[0];
                    }
                    
                    if (i <= 1){
                        this.arHeaderCart[1] = arCart[1];                     
                    } else {
                        break;
                    }
                }

                this.updateCart();
            }else{
                this.emptyCart = true;
            }
        },

        updateCart: function () {
            if(JSON.parse(sessionStorage.getItem("Cart")) !== ""){
                var arCart = JSON.parse(sessionStorage.getItem("Cart"));
                this.totalitem = 0;
                this.cartnumber = 0;

                for(var i = 0; i < arCart.length; i++){
                    this.cartnumber += parseInt(arCart[i].qty);
                    arCart[i].price = parseFloat(this.arProd[arCart[i].id].price) * parseFloat(arCart[i].qty);
                    this.totalprice += parseFloat(arCart[i].price);

                    if(i == 0){
                        this.emptyCart = false;
                        this.arHeaderCart[0] = arCart[0];
                    }
                    
                    if (i <= 1){
                        this.arHeaderCart[1] = arCart[1];                     
                    }
                }

                window.sessionStorage.setItem("Cart", JSON.stringify(arCart));
    			this.$emit('attCartNumber');

                this.totalprice = addRS(parseFloat(this.totalprice));
                
                if(arCart.length > 2){        
                    var totalDisplay = parseInt(this.arHeaderCart[0].qty) + parseInt(this.arHeaderCart[1].qty);

                    this.showTotalItem = true;    
                    this.totalitem = this.cartnumber - totalDisplay;
                    this.totalitem = this.totalitem > 1? "+ " + this.totalitem + " itens" : + "+ 1 item";
                }else{
                    this.showTotalItem = false;
                }
            }else{
                this.emptyCart = true;
            }
        },

        addRS: function (price) {
            return "R$ " + price.toFixed(2).toString();
        },

        resetSessionCart: function(){
            /*this.arBuild = this.arProd;

            tdCartContent.innerHTML = "Não há nada no carrinho";
            divCartButtons.style.display = "none";
            pCartNumber.innerHTML = "0";
            divCartQtd.innerHTML = "";
            divCartQtd.style.display = "block";

            window.sessionStorage.setItem("Cart", JSON.stringify(""));*/
        },

        
    }
}
</script>

<style>

</style>