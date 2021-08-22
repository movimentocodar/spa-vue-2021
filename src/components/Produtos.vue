<template>
<div class="principal">
    <div class="destaques">
      <h2 class="destaques__titulo">Destaques</h2>
      <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Busque pelo nome" />
    </div>
    <ul class="produtos">
        <li v-for="produto in produtosComFiltro" class="lista-produto">
            <img :src="produto.imagem" class="lista-produto__imagem" />
            <h3 class="lista-produto__nome">{{ produto.nome }}</h3>
            <p class="lista-produto__valor">{{ produto.valor }}</p>
            <input class="lista-produto__quantidade" type="number" min="0">
            <input class="lista-produto__comprar" type="button" value="Comprar" v-adicionar-carrinho>
        </li>
    </ul>
</div>
</template>

<script>
export default{
    name: 'lista-produtos',
    data(){
        return{
            produtos:[

                {
                    imagem: require('@/assets/produto-primer-anti-poluicao.jpg'),
                    nome: 'primer anti poluição vizzela',
                    valor: 49.90
                },
                {
                    imagem: require('@/assets/produto-cleansing-oil.jpg'),
                    nome: 'cleansing oil vizzela',
                    valor: 49.90
                },
                {
                    imagem: require('@/assets/produto-bb-cream-vizzela.png'),
                    nome: 'bb cream fps 30 vizzela',
                    valor: 59.90
                },
                {
                    imagem: require('@/assets/produto-base-liquida-vizzela.png'),
                    nome: 'base líquida 01 vizzela',
                    valor: 41.90
                },
                {
                    imagem: require('@/assets/produto-delineador-colorido.png'),
                    nome: 'delineador colorido vizzela',
                    valor: 39.90
                },
                {
                    imagem: require('@/assets/produto-delineador-marromcat.jpg'),
                    nome: 'delineador – cat lovers vizzela',
                    valor: 39.90
                },
                {
                    imagem: require('@/assets/produto-balm-labial-xoxo.jpg'),
                    nome: 'balm labial xoxo fps 20 vizzela',
                    valor: 19.90
                },
                {
                    imagem: require('@/assets/produto-batom-liquido-vizzela.jpg'),
                    nome: 'batom líquido vizzela',
                    valor: 28.50
                }

            ],
            filtro: ''
        }
    },
    computed: {

        produtosComFiltro(){

            if(this.filtro){
                let exp = new RegExp(this.filtro.trim(), 'i');
                return this.produtos.filter(produto => exp.test(produto.nome));
            }else{
                return this.produtos
            }
            
        }

    }
}
</script>

<style scoped>
.principal{
    width: 60%;
}

.destaques{
    display: grid;
    padding: 0 2.5em;
    width: 90%;
}

.destaques__titulo{
    font-weight: bold;
    font-size: 2em;
    padding: 0.5em 0;
    margin: 0;
}

.filtro{
    margin: 0 0 1em 0.5em;
    padding: 0.5em;
}

.produtos{
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}

.lista-produto{
    background: #fff;
    border: 1px solid #ccc;
    display: inline-block;
    margin: 0.5em;
    padding: 0.5em;
    vertical-align: middle;
    width: 20%
}

.lista-produto:hover{
    border: 1px solid #baa0d7;   
}

.lista-produto__imagem{
    width: 100%;
}

.lista-produto__nome{
    font-size: 1em;
    font-weight: bold;
    line-height: 1.5;
    max-width: 150px;
    padding: 0.5em 0;
    margin: 0; 
}

.lista-produto__valor{
    padding: 0.5em 0;
    margin: 0;
}

.lista-produto__valor:before{
    content: "R$ ";
}

.lista-produto__quantidade{    
    display: block;
    margin: 0.5em 0;
    width: 95%;    
}

.lista-produto__comprar{
    background: #baa0d7;
    border: none;
    border-radius: 2px;
    font-weight: bold;
    padding: 0.5em 1.5em;
    transition: 100ms;
    width: 100%;
}

.lista-produto__comprar:hover{
    background: #553e6e;
    color: #fff;
}
</style>