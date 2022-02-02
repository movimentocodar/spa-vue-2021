export default class validaCampoInput {
  public static somenteNumeros(e: KeyboardEvent): void {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    if (e.key === "," || e.key === "." || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }

    if (el.value.length > 3) {
      el.value = el.value.slice(0, 3);
    }
  }

  public static quantidadeInvalida(e: KeyboardEvent): void {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    if (el.value === "0") {
      alert("Não é possivel informar a quantidade zero" + el.value);
    }
  }
}
