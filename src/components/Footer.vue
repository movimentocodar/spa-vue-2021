<template>
    <footer>
        <table class="banner-bottom">
            <tr>
                <td class="banner-social">
                    <div class="div-facebook"><img src="../assets/facebook.png" class="img-face"><a href="" class="social-name">Facebook</a></div>
                    <div class="div-instagram"><img src="../assets/instagram.png" class="img-insta"><a href="" class="social-name">Instagram</a> </div>
                    <div class="div-whatsapp"><img src="../assets/whatsapp.png" class="img-whatsapp"><a href="" class="social-name">Whatsapp</a></div>
                </td>
                <td class="banner-logo-footer">
                    <img src="../assets/logocoffaromaoff.png" class="img-logo-footer">
                </td>
                <td class="banner-menu-map">
                    <nav>
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/">Produtos</router-link></li>
                        <li><a href="">Sobre nós</a></li>
                        <li><router-link to="/contato">Contato</router-link></li>
                    </nav>
                </td>
            </tr>
        </table>     

        <section class="banner-contacts">
            <p>TELEFONE: (11) 9999-9999  &#9679;  WHATSAPP: (11) 99906-9999  &#9679;  E-MAIL DE CONTATO: contato@coffaroma.com.br</p>
        </section>

        <section class="banner-copyrights">
            &copy; Copyright CoffAroma
        </section>
    </footer>
</template>

<script>

</script>

<style>
/*Footer*/

footer {
	background: #090401;
    color: #F3ECD9;
}

.banner-bottom{
	width: 585px;
	height:135px;
	margin: 0 auto;
}

/*Redes sociais, logo e mapa do website*/

.banner-social, .banner-menu-map{
	vertical-align:Top;
	padding:50px 0;
}

.social-name{
	position:relative;
	top:-5px;
	left:20px;
	display:inline;
}

.div-facebook, .div-instagram, .div-whatsapp{
	display:block;
	width:135px;
	padding:10px 0px;
}

.img-face, .img-insta, .img-whatsapp{
	width:25px;
	height:25px;
}

.img-logo-footer {
	position: relative;
	top:55px;
	width: 131px;
	height: 138px;
}

footer nav li {
	display: block;
	padding:10px 0px;
}

/*Contatos*/

.banner-contacts{
	background: black;
	font-family: 'Roboto', sans-serif;
	padding:15px 0px;
	text-align:center;
}

/*Copyrights*/

.banner-copyrights{
    background-image: url(../assets/graosdefundo.png);
    background-repeat: repeat-x;
	background-size: 940px 25px;
	font-family: 'Roboto', sans-serif;
	height:18px;
	text-align:center;
    color: #F3ECD9;
	font-size:12px;
	padding:7px 0px;
}

</style>