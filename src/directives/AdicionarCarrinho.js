import Vue from 'vue';

let valorTotal = 0;
let qtdTotal = 0;

Vue.directive('adicionar-carrinho', {
    bind( el, bingin, vnode ){

        el.addEventListener('click', function(){
            const produtoSelecionado = this.parentNode;
            const quantidade = produtoSelecionado.querySelector('.lista-produto__quantidade');

            if( quantidade.value <= 0 ){
                alert('Selecione uma quantidade para este produto.')
            }else{
                inserirProdutoCarrinho(produtoSelecionado);
                quantidade.value = 0;
            }  

        });

    }

});


const inserirProdutoCarrinho = (produtoSelecionado) =>{
    
    const listaProdutosCarrinho = document.querySelector('.carrinho__produtos-selecionados');
    
    const produtoImage = produtoSelecionado.querySelector('.lista-produto__imagem').src;
    const produtoNome = produtoSelecionado.querySelector('.lista-produto__nome').textContent;
    const produtoPreco = produtoSelecionado.querySelector('.lista-produto__valor').textContent;
    const produtoQtd = produtoSelecionado.querySelector('.lista-produto__quantidade').value;

    const nenhumProduto = document.querySelector('.nenhum-produto');
    nenhumProduto.style.display = 'none';

    const htmlPreco = document.querySelector('[data-valor-total]');
    const htmlQtd = document.querySelector('[data-qtd-total]');

    const novaLinha = document.createElement('li');
    novaLinha.classList.add('produto-selecionado');

    const produtoImagemCarrinho = document.createElement('img');
    produtoImagemCarrinho.classList.add('produto-selecionado__imagem');
    produtoImagemCarrinho.src = produtoImage;

    const divNomeEQuantidade = document.createElement('div');
    divNomeEQuantidade.classList.add('produto-selecionado__nomeEQuantidade');

    const produtoNomeCarrinho = document.createElement('h4');
    produtoNomeCarrinho.classList.add('produto-selecionado__nomeEQuantidade__titulo');
    produtoNomeCarrinho.textContent = produtoNome;

    const produtoQtdCarrinho = document.createElement('p');
    produtoQtdCarrinho.classList.add('produto-selecionado__nomeEQuantidade__quantidade');
    produtoQtdCarrinho.textContent = `Quantidade: ${produtoQtd}`;  
    
    const btnDeletar = document.createElement('img');
    btnDeletar.classList.add('produto-selecionado__deletar');
    btnDeletar.src = require('@/assets/close.png');

    btnDeletar.addEventListener('click', () => {
        const linha = btnDeletar.parentNode;
        
        atualizarCarrinho(produtoPreco, produtoQtd);

        htmlPreco.innerHTML = valorTotal.toFixed(2);
        htmlQtd.innerHTML = qtdTotal;

        linha.remove();
    });


    divNomeEQuantidade.appendChild(produtoNomeCarrinho);
    divNomeEQuantidade.appendChild(produtoQtdCarrinho);
    novaLinha.appendChild(produtoImagemCarrinho);
    novaLinha.appendChild(divNomeEQuantidade);
    novaLinha.appendChild(btnDeletar);
    listaProdutosCarrinho.appendChild(novaLinha);

    calcularCarrinho(produtoPreco, produtoQtd);    

    htmlPreco.innerHTML = valorTotal.toFixed(2);
    htmlQtd.innerHTML = qtdTotal;
}

function calcularCarrinho(produtoPreco, produtoQtd){
    valorTotal += parseFloat(produtoPreco) * parseFloat(produtoQtd);
    qtdTotal += parseInt(produtoQtd);
}

const atualizarCarrinho = (produtoPreco, produtoQtd) => {
    valorTotal -= parseFloat(produtoPreco) * parseFloat(produtoQtd);
    qtdTotal -= parseInt(produtoQtd);
}