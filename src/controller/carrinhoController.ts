import ProdutoModel from "../model/Produto";
import ProdutosDTO from "../model/Produto";
import { Movimento } from "../model/enum";

export abstract class Carrinho {
  private static qtdTotal = 0;
  private static vlrTotal = 0;

  private static produtos: ProdutosDTO[] = [];

  public static adiciona(produto: ProdutosDTO): void {
    this.produtos.push(produto);
  }

  public static lista(): readonly ProdutosDTO[] {
    return this.produtos;
  }

  public static quantidadeTotal(
    produto: ProdutoModel,
    movimento: Movimento
  ): number {
    if (movimento == Movimento.CREDITO) {
      this.qtdTotal += produto.quantidade;
    } else {
      this.qtdTotal -= produto.quantidade;
    }
    return this.qtdTotal;
  }

  public static valorTotal(
    produto: ProdutoModel,
    movimento: Movimento
  ): number {
    if (movimento == Movimento.CREDITO) {
      this.vlrTotal += parseFloat(produto.preco.toFixed(2));
    } else {
      this.vlrTotal -= parseFloat(produto.preco.toFixed(2));
    }

    return parseFloat(this.vlrTotal.toFixed(2));
  }

  public static remover(produto: ProdutosDTO): void {
    const index = this.produtos.indexOf(produto);
    if (index > -1) {
      this.produtos.splice(index, 1);
    }
  }

  public static finalizar(): void {
    this.produtos.splice(0, this.produtos.length);
    this.qtdTotal = 0;
    this.vlrTotal = 0;
  }

  public static verificarResolucao(): void {
    const windowWidth = window.innerWidth;
    const screenWidth = screen.width;
    if (windowWidth <= 768 || screenWidth <= 768) {
      window.scrollTo(0, 99999);
    }
  }
}
