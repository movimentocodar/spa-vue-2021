import produtoServices from "@/services/produtoServices";
import ProdutoModel, { IProdutoModel } from "../model/Produto";

export default class cardsController {
  static produtos: ProdutoModel[];
  public static validaQuantidade(e: KeyboardEvent): void {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    const qtd: number = parseInt(el.value, 10);

    if (isNaN(qtd)) {
      el.setAttribute("value", "1");
    }

    const elemento = el.parentElement.parentElement;
    const element = el.parentElement.parentElement.parentElement;
    const input = elemento.querySelectorAll("input").item(0);
    const botao = element.querySelectorAll("button").item(0);

    if (input.value === "") {
      botao.setAttribute("disabled", "");
      botao.setAttribute("style", "opacity:0.7");
    } else {
      botao.removeAttribute("disabled");
      botao.setAttribute("style", "opacity:1");
    }
  }

  public static async getProdutos(): Promise<ProdutoModel[]> {
    return await produtoServices
      .getProdutos()
      .then((res) => (this.produtos = res));
  }

  public static somenteNumeros(e: KeyboardEvent): void {
    const el: HTMLInputElement = e.target as HTMLInputElement;

    if (
      e.key === "," ||
      e.key === "." ||
      e.key === "+" ||
      e.key === "-" ||
      e.key == "0"
    ) {
      e.preventDefault();
    }

    if (el.value.length > 3) {
      el.value = el.value.slice(0, 3);
    }
  }

  public static incrementa(e: HTMLInputElement): void {
    const elemento = e.parentElement.parentElement;
    const element = e.parentElement.parentElement.parentElement.parentElement;
    const botao = element.querySelectorAll("button").item(0);
    const input = elemento.querySelectorAll("input").item(0);
    const qtd: number = parseInt(input.value, 10);

    input.stepUp(1);

    if (isNaN(qtd)) {
      input.setAttribute("value", "1");
    }

    if (input.value === "") {
      botao.setAttribute("disabled", "");
      botao.setAttribute("style", "opacity:0.7");
    } else {
      botao.removeAttribute("disabled");
      botao.setAttribute("style", "opacity:1");
    }
  }

  public static decrementa(e: HTMLInputElement): void {
    const elemento = e.parentElement.parentElement;
    const input = elemento.querySelectorAll("input").item(0);
    input.stepDown(1);
  }

  public static comprar(produtoElemento: HTMLElement): ProdutoModel {
    const elemento = produtoElemento.parentElement;

    const codigo = elemento
      .querySelector("[data-produto-codigo]")
      .getAttribute("data-produto-codigo");
    const imagem = elemento
      .querySelector("[data-produto-imagem]")
      .getAttribute("data-produto-imagem");

    const descricao = elemento.querySelector(
      "[data-produto-descricao]"
    ).textContent;

    const preco = elemento.querySelector("[data-produto-preco]").textContent;

    const quantidade = elemento.querySelectorAll("input").item(0).value;

    const precoTotal: number =
      parseFloat(preco.replace("R$", "")) * parseInt(quantidade);

    const produto: IProdutoModel = {
      codigo: parseInt(codigo),
      descricao: descricao,
      preco: precoTotal,
      quantidade: parseInt(quantidade),
      imagem: imagem,
      departamento: "",
    };

    return ProdutoModel.criarProduto(produto);
  }
}
