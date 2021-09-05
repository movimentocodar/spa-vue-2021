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
export default {
	props: {
		pagetitle: String,
		visivel: Boolean
	},

	data() {
		return {
            searchtag: "",
			arProd: [
                {name:'Dolce Gusto Caffé Matinal',descr:'Intensidade 9',id:0},        
                {name:'Dolce Gusto Alpino',descr:'Intensidade 8',id:1},
                {name:'Dolce Gusto Caseiro Intenso',descr:'Intensidade 10',id:2},
                {name:'Dolce Gusto Au Lait',descr:'Café com leite',id:3},
                {name:'Dolce Gusto Espresso',descr:'Intensidade 8',id:4},
                {name:'Melitta Sabor da Fazenda',descr:'Intensidade 7',id:5},
                {name:'Innovare Tradicional',descr:'Intensidade 7',id:6},
                {name:'Nespresso Colombia',descr:'Intensidade 9',id:7},
                {name:'Nespresso Cafézinho',descr:'Intensidade 5',id:8},
                {name:'Caneca Sakura Starbucks',descr:'Material em cerâmica',id:9},
                {name:'Caneca Preta',descr:'Material em cerâmica',id:10}
                ]
		}
	},	

	methods: {
		searchProduct: function (event) {
            var arFound = [];

            if(this.searchtag != ""){
                for(var i = 0; i < this.arProd.length;i++){
                    if((this.arProd[i].name.toLowerCase()).includes(this.searchtag.toLowerCase()) || (this.arProd[i].descr.toLowerCase()).includes(this.searchtag.toLowerCase())){
                        if(arFound){
                            arFound.push(this.arProd[i]);
                        } else {
                            arFound = this.arProd[i];
                        }
                    }
                }

                if(arFound != ""){
					window.sessionStorage.setItem("Search", JSON.stringify(arFound));
                } else {
					window.sessionStorage.setItem("Search", JSON.stringify("notfound"));
					console.log("não encontrou");
                }

    			this.$emit('generateProductList');
            } else {
				window.sessionStorage.setItem("Search", JSON.stringify(""));
    			this.$emit('generateProductList');
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