import Vue from 'vue';

Vue.directive('finalizar-carrinho', {
    bind( el, bingin, vnode ){

        el.addEventListener('click', function(){
            const produtosCarrinho = document.querySelector('.carrinho__produtos-selecionados');

            while( produtosCarrinho.firstChild ){
                produtosCarrinho.removeChild(produtosCarrinho.firstChild);
                const valorTotal = document.querySelector('[data-valor-total]');
                const qtdTotal = document.querySelector('[data-qtd-total]');
                valorTotal.innerHTML = 0.00.toFixed(2);
                qtdTotal.innerHTML = 0;
            }

            const quantidadeListaProdutos = document.querySelectorAll('.lista-produto__quantidade');
            for(let el of quantidadeListaProdutos){
                el.value = 0;
            }

            const nenhumProduto = document.createElement('li');
            nenhumProduto.classList.add('nenhum-produto');
            nenhumProduto.textContent = 'Nenhum produto adicionado!';

            produtosCarrinho.appendChild(nenhumProduto);

        });

    }

});