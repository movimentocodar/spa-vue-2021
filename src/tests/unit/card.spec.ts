
import { mount, Wrapper } from "@vue/test-utils";
import Card from "../../components/card.vue";
import ProdutoStore from "@/store/Store";
import { Produto } from "@/model/Produto";
import { Movimento } from "@/model/enum";

const produto: Produto[] = [
  {
    codigo: 1,
    descricao: "Arroz",
    imagem: "http://www.hugoogle/arroz",
    quantidade: 1,
    preco: 20.0,
    precoTotal: 20,
    departamento: "Mercearia",
  },

  {
    codigo: 2,
    descricao: "Leite",
    imagem: "http://www.hugoogle/leite",
    quantidade: 1,
    preco: 12.0,
    precoTotal: 12,
    departamento: "Mercearia",
  },
];
describe("Card", () => {
  let wrapper: Wrapper<Card>;

  beforeEach(() => {
    wrapper = mount(Card, {
      computed: {
        produtos() {
          return produto;
        },
      },
      methods: {
        incrementar(produto: Produto): void {
          ProdutoStore.icrementarQuantidade({
            produto: produto,
            movimento: Movimento.CREDITO,
          });
        },
        decrementar(produto: Produto): void {
          ProdutoStore.decrementarQuantidade({
            produto: produto,
            movimento: Movimento.DEBITO,
          });
        },
      },
    });
  });

  test("Adiciona produtos no carrinho", async () => {
    const adicionar = wrapper.find("div:nth-child(1) > button");
    await adicionar.trigger("click");
    await wrapper.vm.$nextTick();

    const adicionar1 = wrapper.find("div:nth-child(2) > button");
    await adicionar1.trigger("click");
    await wrapper.vm.$nextTick();
    expect(ProdutoStore.quantidadeTotal).toBe(2);
  });

  test("Decrementa quantidade do produto no carrinho", async () => {
    
    const adicionar = wrapper.find("div:nth-child(1) > button");
    await adicionar.trigger("click");
    await wrapper.vm.$nextTick();

    const decrementa = wrapper.find(".input-number-decrement");
    await decrementa.trigger("click");
    await wrapper.vm.$nextTick();

    expect(ProdutoStore.getCarrinho[0].quantidade).toBe(1);
    expect(ProdutoStore.getCarrinho[0].precoTotal).toBe(20);
  
  });

  test("Incrementa quantidade do produto no carrinho", async () => {
  
    const incrementa = wrapper.find(".input-number-increment");
    await incrementa.trigger("click");
    await wrapper.vm.$nextTick();


    const incrementa1 = wrapper.find(".input-number-increment");
    await incrementa1.trigger("click");
    await wrapper.vm.$nextTick();

    expect(ProdutoStore.getCarrinho[0].quantidade).toBe(3);
    expect(ProdutoStore.getCarrinho[0].precoTotal).toBe(60);
  
  });

  test("Inputa 10 unidade do produto no carrinho totalizando 13 unidades", async () => {

    const input = wrapper.find("div:nth-child(1) > div > div > input[type=number]");
    input.setValue(10)
    const adicionar = wrapper.find("div:nth-child(1) > button");
    await adicionar.trigger("click");
    await wrapper.vm.$nextTick();
    expect(ProdutoStore.getCarrinho[0].quantidade).toBe(13);
    expect(ProdutoStore.getCarrinho[0].precoTotal).toBe(260);
  
  });





});
