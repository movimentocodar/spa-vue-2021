<template>
  <div>
    <cheader></cheader><!-- -->
    <body id="app">
      <main>
        <router-view></router-view>   
      </main>
    </body>
    <cfooter></cfooter>
  </div>
</template>

<script>
import Produtos from './components/Produtos.vue';
import pageHeader from './components/Header.vue';
import pageFooter from './components/Footer.vue';

export default {
  components: {
    "cproducts": Produtos,
    "cheader": pageHeader,
    "cfooter": pageFooter
  },

  head: {
    title: {
      inner: "CoffAroma"
    },
    meta: [
      { charset: 'UTF-8'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
    ]
  }
}

</script>


<style>

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

body, .content-section, .search-input, .search-title, .addcart-button, .viewcart-button, .input-prod-qty, .input-prod-qty-cart, .button-cart{
	font-family: 'Merriweather', sans-serif;
	font-size:16px;
}

/*Menu*/

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

/*Pointer para botões*/

.button-cart:hover, .close-cart:hover, .addcart-button:hover, .viewcart-button:hover, .add-prod-qty:hover, .del-prod:hover, .del-prod-cart:hover{
	cursor:pointer;
}

.addcart-button, .viewcart-button{
	width:198px;
	height:40px;
	background-color:#C49664;
	color:black;
	text-align:Center;
	border:0px;
	padding: 5px 0px;
}

.addcart-button:hover, .add-prod-qty:hover, .close-prod:hover, .del-prod:hover, .del-prod-cart:hover, .viewcart-button:hover{
	background-color:#946737;
	transition: 0.5s;
}

/*Listagem do carrinho*/

.close-cart{
	font-family: 'Merriweather', sans-serif;
	font-size:14px;
	font-weight:bold;
}


.hidebuttons, .hidecart{
	display:none;
}

.hidecart{
	position:absolute;
	top: 152px;
	left:990px;
}

.img-cart-appen{
	position:relative;
	left:20px;
	width:49px;
	height:29px;
}


.cart{
	position:relative;
	top:-5px;
	width:220px;
	height:auto;
	padding:35px 22px;
	background-color:white;

}

.prod-descr-cart{
	padding: 0 0 0 10px;
}

.del-prod-cart{
	position:relative;
	top:5px;
	margin:0px 0px 0px 10px;
}

.prod-price-cart{
	display:inline;
	margin:0 5px;
	font-size:16px;
}

.prod-cart{
	padding:10px;
}

.close-prod{
	float:right;
	position:relative;
	top:-20px;
	right:-10px;
}

.img-prod-cart{
	width:68px;
	height:71px;
}

.cart-line{
	width: 160px;
	border-bottom:1px solid #946737;
	margin:20px auto 30px auto;
}

.prod-price-cart{
	display:inline;
}

.prod-cart-img{
	width:80px;
}

.viewcart-button{
	margin: 0px 0px 0px 12px;
}

.prod-cart-add{
	width:140px;
}

/*Listagens de produtos*/

.input-prod-qty, .input-prod-qty-cart{
	width:50px;
	height:35px;
	background-color:white;
	border: 1px solid #C49664;
	font-weight:bold;
	padding:2px 5px;
	text-align:center;
	vertical-align: top;
	margin:0px 5px 0px 0px;
}

.prod-name-cart, .prod-itens{
	padding:0 0 10px 0;
	font-size:14px;
	text-align:center;
	font-weight:bold;
}

.prod-itens{
	text-align:right;
}

.prod-qty{
	font-size:16px;
	display:inline;
}

.prod-price, .prod-price-cart{
	font-family: 'Bebas Neue', sans-serif;
	font-size:22px;
	text-align:center;
	padding: 5px 0px;
}

.addcart-button, .viewcart-button{
	width:198px;
	height:40px;
	background-color:#C49664;
	color:black;
	text-align:Center;
	border:0px;
	padding: 5px 0px;
}

.input-prod-qty{
	margin:0 5px 0 10px;
}

.add-prod-qty, .del-prod, .del-prod-cart, .close-prod{
	font-family: 'Bebas Neue', sans-serif;
	font-size:48px;
	color:black;
	width:48px;
	height:40px;
	background-color:#C49664;
	border:0px;
}

.add-prod-qty, .del-prod{
	margin:0 5px 0 0;
}

.addcart-button:hover, .add-prod-qty:hover, .close-prod:hover, .del-prod:hover, .del-prod-cart:hover, .viewcart-button:hover{
	background-color:#946737;
	transition: 0.5s;
}
</style>
