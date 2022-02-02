import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { store } from "./index";
import http from "../api/httpPlaceHolder";
import { Produto } from "../model/Produto";
import { Carrinho } from "@/model/Carrinho";
import { Movimento } from "@/model/enum";
import { AxiosError } from "axios";
import StoreLogin from "../store/StoreLogin";

@Module({
  dynamic: true,
  stateFactory: true,
  namespaced: true,
  name: "Hugoogle",
  store,
})
class Stor extends VuexModule {
  private produtos: Produto[] = [];
  produtosFiltrados: Produto[];
  carrinhoItem: Carrinho[] = [];
  private temporizador = 0;
  private mensagem = "";
  private dismissCountDown = 0;
  private departamento = "";

  get getProdutos() {
    return this.produtos.map((p) => {
      return {
        codigo: p.codigo,
        descricao: p.descricao,
        imagem: p.imagem,
        quantidade: 1,
        preco: p.preco,
      };
    });
  }

  get getCarrinho() {
    return this.carrinhoItem;
  }

  get quantidadeTotal() {
    return this.carrinhoItem.length;
  }

  get valorTotalNoCarrinho() {
    return this.carrinhoItem.reduce((total, produto) => {
      return total + produto.precoTotal;
    }, 0);
  }

  get getDismissCountDown() {
    return this.dismissCountDown;
  }

  set setDismissCountDown(tempo: number) {
    this.dismissCountDown = tempo;
  }

  get mensagemStore() {
    return this.mensagem;
  }

  get getDepartamento() {
    return this.departamento;
  }

  @Action({ commit: "setProduto" })
  async buscarProdutos(): Promise<Produto[]> {
    try {
      const response = await http.get<Produto[]>("/produtos");
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.log("Ocorreu um erro " + err.response.status);
        console.log(err.response.data);
      }
    }
  }

  @Action
  async listaPorDescricao(descricao: string) {
    const rs = this.buscarProdutos().then((res) =>
      res.filter((produto) => {
        if (
          produto.descricao.toLowerCase().indexOf(descricao.toLowerCase()) > -1
        ) {
          return produto;
        }
      })
    );

    this.filtrar(await rs.then((res) => res));
  }

  @Action
  async listaPorDepartamento(departamento: string) {
    const rs = this.buscarProdutos().then((res) =>
      res.filter((produto) => {
        const departamentoSelecionado =
          departamento === "Todos os departamentos" ? "" : departamento;

        return produto.departamento.match(
          departamentoSelecionado.toLowerCase()
        );
      })
    );
    this.departamentoSelecionado(departamento);
    this.filtrar(await rs.then((res) => res));
  }

  @Mutation
  departamentoSelecionado(departamento: string) {
    this.departamento = departamento;
  }

  @Action({ rawError: true })
  addProdutoNoCarrinho(item: Produto): void {
    this.incluirProdutoNoCarrinho(item);
  }

  @Action
  icrementarQuantidade({
    produto,
    movimento,
  }: {
    produto: Produto;
    movimento: Movimento;
  }): void {
    this.recalcularItemNoCarrinho({ produto, movimento });
  }

  @Action
  decrementarQuantidade({
    produto,
    movimento,
  }: {
    produto: Produto;
    movimento: Movimento;
  }): void {
    this.recalcularItemNoCarrinho({ produto, movimento });
  }

  @Action
  excluirProdutoDoCarrinho(produto: Produto) {
    const remove = confirm(
      `Deseja realmente remover o produto ${produto.descricao} `
    );
    if (remove) {
      const index = this.carrinhoItem.indexOf(produto);
      this.excluirProduto(index);
    }
  }

  @Action
  finalizarPedido() {
    const isLogado = StoreLogin.getUsuario.name;

    if (isLogado === "" || this.carrinhoItem.length === 0) {
      alert(
        "Para finalizar o pedido o usuario deve está logado e deve haver ao menos um produto adicionado ao carrinho!"
      );
    } else {
      if (this.quantidadeTotal != 0) {
        const finalizar = confirm("Deseja realmente finalizar a compra?");
        finalizar == true ? this.fecharPedido() : false;
      }
    }
  }

  @Action
  pedidoFinalizado() {
    this.zerandoTempo(0);
  }

  @Mutation
  incluirProdutoNoCarrinho(item: Produto) {
    const quantidaValida = item.quantidade >= 1 ? item.quantidade : false;

    if (quantidaValida) {
      const itemCarrinho = this.carrinhoItem.find(
        (p) => p.codigo === item.codigo
      );

      const precoTotal = item.preco * item.quantidade;

      if (itemCarrinho) {
        itemCarrinho.quantidade += item.quantidade;
        itemCarrinho.precoTotal += parseFloat(precoTotal.toFixed(2));
      } else {
        this.carrinhoItem.push({
          codigo: item.codigo,
          imagem: item.imagem,
          descricao: item.descricao,
          quantidade: item.quantidade,
          preco: item.preco,
          precoTotal: parseFloat(precoTotal.toFixed(2)),
        });
      }
    }
  }

  @Mutation
  filtrar(produto: Produto[]) {
    this.produtos = produto;
  }

  @Mutation
  setProduto(produtos: Produto[]) {
    this.produtosFiltrados = produtos;
    this.produtos = produtos;
  }
  @Mutation
  filtrarProduto(descricao?: string, departamento?: string | null) {
    return this.produtos.filter((produto) => {
      if (descricao) {
        if (
          produto.descricao.toLowerCase().indexOf(descricao.toLowerCase()) > -1
        ) {
          return produto;
        }
      } else {
        const departamentoSelecionado =
          departamento === "Todos" ? "" : departamento;

        return produto.departamento.match(departamentoSelecionado);
      }
    });
  }

  @Mutation
  recalcularItemNoCarrinho({
    produto,
    movimento,
  }: {
    produto: Produto;
    movimento: Movimento;
  }): void {
    const cartItem: Carrinho = this.carrinhoItem.find(
      (p) => p.codigo === produto.codigo
    );
    if (cartItem && cartItem.quantidade >= 1 && movimento === "CREDITO") {
      cartItem.quantidade++;
      const total =
        parseFloat(cartItem.precoTotal.toString()) +
        parseFloat(produto.preco.toString());
      cartItem.precoTotal = parseFloat(total.toFixed(2));
    } else if (cartItem && cartItem.quantidade > 1 && movimento === "DEBITO") {
      cartItem.quantidade--;
      const total =
        parseFloat(cartItem.precoTotal.toString()) -
        parseFloat(produto.preco.toString());
      cartItem.precoTotal = parseFloat(total.toFixed(2));
    }
  }

  @Mutation
  excluirProduto(index: number) {
    this.carrinhoItem.splice(index, 1);
  }

  @Mutation
  fecharPedido() {
    this.carrinhoItem.splice(0, this.produtos.length);
    window.scrollTo(0, 0);
    this.mensagem = "Pedido sendo processodo, por favor aguarde!";
    this.temporizador = 5;
    this.dismissCountDown = 5;
  }

  @Mutation
  zerandoTempo(valor: number) {
    this.dismissCountDown = valor;
  }
}

const stor = getModule(Stor);
export default stor;
