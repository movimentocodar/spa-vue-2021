import http from "../model/httpPlaceHolder";
import ProdutoModel, {IProdutoDTO} from "../model/Produto";

export type APIResponse = [null, ProdutoModel] | [Error];

class ProdutoService {
  async getProdutos(): Promise<ProdutoModel[]> {
    const response = await http.get<ProdutoModel[]>('/produtos');
    return response.data.map((produtos: IProdutoDTO) => ProdutoModel.criarProduto(produtos))  
  }
}

export default new ProdutoService();
