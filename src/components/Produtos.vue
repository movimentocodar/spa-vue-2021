<template>
    <ul class="produtos">
        <li v-for="produto in produtos" class="lista-produto">
            <img :src="produto.imagem" class="lista-produto__imagem" />
            <h3 class="lista-produto__nome">{{ produto.nome }}</h3>
            <p class="lista-produto__valor">{{ produto.valor }}</p>
            <input class="lista-produto__quantidade" type="number" min="0">
            <input class="lista-produto__comprar" type="submit" value="Comprar">
        </li>
    </ul>
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

            ]
        }
    }
}
</script>

<style scoped>
.produtos{
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 60%;
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