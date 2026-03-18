export default class BtnModal {
  constructor(
    modal,
    btnOpenModal = '[data-modal="btn-open"]',
    btnCloseModal = '[data-modal="btn-close"]',
    activeClass = "active", // btnOpen deve estar contendo a classe de ativacao
    events = ["click", "touchstart"]
  ) {
    this.btnOpenModal = document.querySelector(btnOpenModal);
    this.btnCloseModal = document.querySelector(btnCloseModal);
    this.modal = document.querySelector(modal);
    this.activeClass = activeClass;
    this.events = events;
    this.htmlElement = document.querySelector("html");

    this.bindEvents();
  }

  syncState() {
    const isOpen = this.modal.open;

    //sincronica as classes dos botões
    this.changeBtn(isOpen);

    // Atualiza os atributos de acessibilidade
    this.updateAccessibility(isOpen);
  }

  // Adiciona a classse de ativação para a visibilidade do botão e do modal
  changeBtn(isOpen) {
    this.btnOpenModal.classList.toggle(this.activeClass, !isOpen);
    this.btnCloseModal.classList.toggle(this.activeClass, isOpen);
  }

  // Atualiza atributos de acessibilidade
  updateAccessibility(isOpen) {
    this.btnOpenModal.setAttribute("aria-expanded", isOpen);
    this.modal.setAttribute("aria-hidden", !isOpen);
  }

  // Altera a visibilidade do modal
  changeVisibiliteModal(event) {
    if (event) event.preventDefault();

    if (this.modal.open) {
      this.modal.close(); // O evento nativo "close" fará o syncState rodar
    } else {
      this.modal.showModal();
      this.syncState(); // Chama o metodo nativo sync manualmente ao abrir
    }
  }

  // Trata atalhos do teclado
  handleShortcuKey(event) {
    const isActive = this.modal.open;

    if (event.key.toLowerCase() === "t" && !isActive) {
      this.changeVisibiliteModal();
    }
  }

  // Adiciona os eventos
  setupEventListeners() {
    this.events.forEach((event) => {
      this.btnOpenModal.addEventListener(event, this.changeVisibiliteModal);
      this.btnCloseModal.addEventListener(event, this.changeVisibiliteModal);
    });
    window.addEventListener("keydown", this.handleShortcuKey);
    this.modal.addEventListener("close", this.syncState);
  }

  // Realize o bind do métodos
  bindEvents() {
    this.changeVisibiliteModal = this.changeVisibiliteModal.bind(this);
    this.handleShortcuKey = this.handleShortcuKey.bind(this);
    this.syncState = this.syncState.bind(this);
  }

  init() {
    if (!this.modal) {
      console.error("Não foi encontrado nenhum modal com o seletor informado");
    } else if (!this.btnOpenModal || !this.btnCloseModal) {
      console.error(
        "Não foi encontrado nenhum seletor para o botão de abertura e fechamento informados"
      );
    } else {
      this.htmlElement.classList.add("js");
      this.bindEvents();
      this.setupEventListeners();
    }
    return this;
  }
}
