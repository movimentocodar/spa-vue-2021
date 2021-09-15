<template>
    <div class="subtitle">
        <section class="subtitle-section">
            <p class="page-name">{{ pagetitle }}</p>
			<fieldset class="searchset" v-show="visivel">
				<input class="search-input" data-search-input @keyup.enter="searchProduct" v-model:value="searchtag" />
				<button class="search-button" data-search-button @click="searchProduct"><img src="../assets/search.png" class="img-search"><p class="search-title">Pesquisar</p></button>
			</fieldset>
        </section>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import modProd from "../api/prod.js";

export default {
	props: {
		pagetitle: String,
		visivel: Boolean
	},

	data() {
		return {
            searchtag: ""
		}
	},	

	methods: {
		searchProduct: function (event) {
            var arFound = [];
			var arProd = modProd.getArProd();

            if(this.searchtag != ""){
                for(var i = 0; i < arProd.length;i++){
                    if((arProd[i].name.toLowerCase()).includes(this.searchtag.toLowerCase()) || (arProd[i].descr.toLowerCase()).includes(this.searchtag.toLowerCase())){
                        if(arFound){
                            arFound.push(arProd[i]);
                        } else {
                            arFound = arProd[i];
                        }
                    }
                }

                if(arFound != ""){
					this.$store.dispatch("changeSearch",arFound)
                } else {
					this.$store.dispatch("changeSearch","notfound")
					console.log("não encontrou");
                }
            } else {
				this.$store.dispatch("changeSearch","")
            }
            
			this.searchtag = "";
        }
	}
}

</script>

<style scoped>
.subtitle{
	background: #100703;
}

.subtitle-section{
	width: 940px;
	height:37px;
	margin: 0 auto;
	padding: 34px 63px;
}

.page-name{
	font-family: 'Bebas Neue', sans-serif;
	font-size:48px;
	color: #F3ECD9;
	display:inline;
}

.searchset{
	display:inline;
	padding: 0 0 0 60px;
}

.search-input{
	background-color:#F3ECD9;
	width:252px;
	height:31px;
	font-size:14px;
	color:black;
	border:0px;	
	padding:2px 5px;
}

.search-button{
	position:relative;
	top:2px;
	background-color: #100703;
	border:0px;
	height:31px;
	width:auto;
}

.search-button:hover{
	cursor:pointer;
}

.search-title{
    color: #F3ECD9;
	display:inline;
	position:relative;
	top:-3px;
}

.img-search{
	display:inline;
	width:20px;
	height:20px;
	padding:0 7px 0 0;
}
</style>