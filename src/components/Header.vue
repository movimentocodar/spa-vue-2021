<template>
    <div>
        <header>
            <div class="banner-top">
                <section class="banner-logo">
                    <img src="../assets/logocoffaromaoff.png" class="img-logo">
                </section>
        
                <section class="banner-menu">
                    <nav>
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/">Produtos</router-link></li>
                        <li><a href="">Sobre nós</a></li>
                        <li><router-link to="/contato">Contato</router-link></li>
                    </nav>
                </section>

                <section class="banner-profile">
                    
                </section>
        
                <section class="banner-profile-cart">
                    <img :src="profgit.avatar_url" class="img-login" />
                    <p class="profile-name">{{ profgit.login }}</p>
                    
                    <button class="button-cart" data-button-cart @click="ButtonShowCart">
                        <img src="../assets/shopping-cart.png" class="img-cart">
                        <p class="cart-number" data-cart-number><!--{{ cartnumber }}--></p>
                        <p class="cart-title">Meu carrinho</p>
                    </button>
                </section>
            </div>
        </header>
        <div class="hiddencart" data-hidden-cart>
            <cart> <!--v-on:attCartNumber="attCartNumber()"--></cart>
        </div>
    </div></div>
</template>

<script>
import cart from '../components/Cart.vue';

export default {
    components: {
        "cart": cart
    },

    data(){
        return{
            profgit: [],
            //cartnumber: this.$refs.cart.cartnumber
        }
    },

    created() {
        window.addEventListener("resize", this.positionCart);
        window.sessionStorage.setItem("Cart", JSON.stringify(""));
        window.sessionStorage.setItem("Search", JSON.stringify(""));

        this.$http.get('https://api.github.com/users/lilianjaf')
        .then(res => res.json())
        .then(resjs => this.profgit = resjs, err => console.log(err))
    },

    methods: {
        attCartNumber: function(){
           //cartnumber: this.$refs.cart.cartnumber
        },

        positionCart: function () {
            const HiddenCart = document.querySelector('[data-hidden-cart]'),
            buttonCart = document.querySelector('[data-button-cart]');
            var buttonCartRect = buttonCart.getBoundingClientRect();
            HiddenCart.style.left = (buttonCartRect.left - 10).toString() + "px";
        },

        ButtonShowCart: function (event) {
            //this.showCart = true;
            event.preventDefault();
            this.positionCart();
            //this.updateCart();
        },

        ButtonHiddenCart: function (event) {
            event.preventDefault();

            //this.showCart = false;
        }
    }
}


</script>

<style scoped>

/*Header*/

header {
	background: #090401;
    background-image: url(../assets/graosdefundo.png);
    background-repeat: repeat-x;
	background-size: 940px 23px;
    color: #F3ECD9;
}

.banner-top {
	width: 940px;
	height:135px;
	margin: 0 auto;
	padding: 53px 47px 67px 67px;
}

/*Logo*/

.banner-logo{
	position: relative;
	left: 0px;
	top:40px;
	width: 91px;
	height: 95px;
}

.img-logo {
	width: 91px;
	height: 95px;
}



/*Menu*/

.banner-menu{
	position: relative;
	top:-15px;
	left: 138px;
	width:320px;
}

nav li {
	display: inline;
	letter-spacing: 0.3px;
	padding:0 5px;
}

nav li a, .social-name{
    color: #F3ECD9;
	text-decoration:none;
}

nav li a:hover, .social-name:hover{
	text-decoration:underline;
}

/*Profile e Carrinho*/

.cart{
	position:relative;
	top:-5px;
	width:220px;
	height:auto;
	padding:35px 22px;
	background-color:white;
}

.hiddencart{
    position:absolute;
	top: 152px;
	left:990px;
}
.banner-profile-cart{
	float:right;
	position:relative;
	top:-37px;

	width:auto;
	height:29px;
}

.cart-number{
	display:inline;
	position:relative;
	top:-9px;
	left:-2px;
	font-weight:bold;
}

.cart-title{
	display:inline;
	position:relative;
	top:-9px;
}

.profile-name{
	position:relative;
	top:-9px;
	display:inline;
	padding:0 10px 0 5px;
}

.img-cart{
	display:inline;
	width:29.85px;
	height:29px;
}

.img-login{
	width:28px;
	height:29px;
}

.button-cart{
	border:0px;
	background-color: #090401;
    color: #F3ECD9;
}





</style>