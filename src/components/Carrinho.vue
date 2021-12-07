<template>
    <section class="carrinho">
        <h3 class="carrinho__titulo">{{ name }}</h3>

        <ul class="carrinho__produtos-selecionados">
            <li class="nenhum-produto">Nenhum produto adicionado!</li>
        </ul>

        <div class="caixa">
            <p class="carrinho__valor-total">Valor Total: R$ <span data-valor-total>0.00</span></p>
            <p class="carrinho__quantidade-total">Quantidade total: <span data-qtd-total>0</span></p>
        </div>
        
        <input class="carrinho__finalizar" type="submit" value="Finalizar" v-finalizar-carrinho />
    </section>
</template>

<script>
export default {
    data(){
        return{
            name: 'Carrinho'
        }
    }
}
</script>

<style>
.carrinho{
    background: #baa0d7;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1em 0;
    width: 35%;
}

.carrinho__titulo{
    background: #553e6e;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 0;
    padding: 1em;
}

.carrinho__produtos-selecionados li{
  list-style-type:none;
}

.produto-selecionado{
  margin-top: 0.5em;
}

.produto-selecionado__imagem{
  margin-right: 0.5em;
  width: 5em;
  vertical-align: middle;
}

.produto-selecionado__nomeEQuantidade{
  display: inline-block;
}

.produto-selecionado__nomeEQuantidade__titulo{    
  font-weight: bold;
  margin: 0;
}
.produto-selecionado__nomeEQuantidade__quantidade{
  padding-top: 0.2em;
  margin:0;
}

.produto-selecionado__deletar{
  float: right;
  padding: 1em;
  width: 1.2em;
}

.carrinho__valor-total{
    font-weight: bold;
    padding: 0 1.5em;
}

.carrinho__valor-total span{
    font-weight: normal;
}

.carrinho__quantidade-total{
    font-weight: bold;
    padding: 0.5em 1.5em;
}

.carrinho__quantidade-total span{
    font-weight: normal;
}

.carrinho__finalizar{
    background: rgb(63, 63, 63);
    border: 2px solid rgb(63, 63, 63);
    border-radius: 2px;
    color: #fff;
    font-size: 1em;
    font-weight: bold;
    margin: 1em 0 0 0;    
    padding: 1em; 
    transition: 100ms;   
    width: 100%;
}

.carrinho__finalizar:hover{
    background: #fff;
    color: #553e6e;
    border: 2px solid #553e6e;
}
</style>