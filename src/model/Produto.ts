
 export interface IProdutoModel {
  codigo: number, 
  imagem: string;
  descricao: string;
  quantidade: number;
  preco: string;
  departamento: string;
}

export interface IProdutoDTO {
  codigo: number
  imagem: string;
  descricao: string;
  quantidade: number;
  preco: string;
  departamento: string;
}


export default class ProdutoModel implements IProdutoModel {
  
  constructor(
   public   codigo: number, 
   public   imagem: string,
   public   descricao: string,
   public   quantidade: number,
   public   preco: string,
   public   departamento: string
    
      ) {}

  
  static criarProduto(dto: IProdutoDTO): ProdutoModel {
    return new ProdutoModel(dto.codigo, dto.imagem, dto.descricao, dto.quantidade, dto.preco, dto.departamento);
  }
}
