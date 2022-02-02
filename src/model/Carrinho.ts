export interface Carrinho {
  codigo: number;
  imagem: string;
  descricao: string;
  quantidade: number;
  preco: number;
  precoTotal: number;
}

export interface CarrinhoItem {
  codigo: number;
  descricao: string;
  imagem: string;
  quantidade: number;
  preco: number;
}