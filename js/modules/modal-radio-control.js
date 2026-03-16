export default class ModalOptionsRadioControl {
  constructor(elements, activeClass = "active") {
    this.elements = [...document.querySelectorAll(elements)];
    this.activeClass = activeClass;
    this.prefersConfig = {};

    this.bindElements();
  }

  // adiciona a classe de ativação e o checked no radio
  activeRadio() {
    // Percorre todos os radios
    this.elements.forEach((item) => {
      // Busca o label vinculado ao ID do rádio atual
      const labelElement = document.querySelector(`label[for="${item.id}"]`);
      if (!labelElement) return;
      if (item.checked) {
        labelElement.classList.add(this.activeClass);
      } else {
        labelElement.classList.remove(this.activeClass);
      }
    });
  }

  // Adiciona o evemento a todos os radios
  addEventElements() {
    this.elements.forEach((element) => {
      // O evento 'change' dispara quando um elemento radio é selecionado
      element.addEventListener("change", this.activeRadio);
    });
  }

  // Realiza o bind das propriedades e metodos
  bindElements() {
    this.addEventElements = this.addEventElements.bind(this);
    this.activeRadio = this.activeRadio.bind(this);
  }

  init() {
    if (this.elements.length) {
      this.addEventElements();
      this.activeRadio(); // Executa uma vez para marcar o checked padrão
    }
    return this;
  }
}
