export default class BtnModal {
  constructor(
    modalBtn,
    modal,
    activeClass = "active",
    events = ["click", "touchstart"]
  ) {
    this.modalBtn = document.querySelector(modalBtn);
    this.modal = document.querySelector(modal);
    this.activeClass = activeClass;
    this.events = events;
    this.mainElement = document.querySelector("main");

    this.bindEvents();
  }

  // Adiciona a classse de ativação para altera o ícone do botão
  changeBtnIcon(event) {
    // evita de emular o 'click' no mobile, executando apenas o 'touchstart'
    if (event.type === "touchstart") event.preventDefault();

    const isActive = this.modalBtn.classList.toggle(this.activeClass);
    const iconBtn = document.querySelector(".btn__accessibility-icon");
    this.changeVisibiliteModal(isActive);
    this.updateAccessibility(isActive);
    if (isActive) {
      this.focusOnActive(true);
      iconBtn.src = "./src/images/close.svg";
    } else {
      this.focusOnActive(false);
      iconBtn.src = "./src/images/icon-universal-access.svg";
    }
  }

  //Fecha o modal
  closeModal() {
    this.modalBtn.classList.remove(this.activeClass);
    this.changeVisibiliteModal(false);
    this.updateAccessibility(false);
    this.focusOnActive(false);
  }

  openModal() {
    this.modalBtn.classList.add(this.activeClass);
    this.changeVisibiliteModal(true);
    this.updateAccessibility(true);
    this.focusOnActive(true);
  }

  // Altera a visibiiilidade do modal
  changeVisibiliteModal(isActive) {
    this.modal.style.display = isActive ? "flex" : "none";
  }

  // Atualiza atributos de acessibilidade
  updateAccessibility(isActive) {
    this.modalBtn.setAttribute("aria-expanded", isActive);
    this.modal.setAttribute("aria-hidden", !isActive);
    this.modal.setAttribute("aria-modal", isActive);
  }

  // Adiciona focus ao modal ou ao main
  focusOnActive(isActive) {
    if (isActive) {
      this.modal.setAttribute("tabindex", "-1");
      this.modal.focus();
      this.mainElement.setAttribute("inert", "");
    } else {
      this.modalBtn.focus();
      this.mainElement.removeAttribute("inert");
    }
  }

  // Fecha o modal ao abertar escape
  handleShortcuKey(event) {
    let isActive = this.modalBtn.classList.contains(this.activeClass);
    if (event.key === "Escape" && isActive) {
      this.closeModal();
    } else if (event.key === "t" && !isActive) {
      this.openModal();
    }
  }

  // Adiciona os evento
  setupEventListeners() {
    this.events.forEach((event) => {
      this.modalBtn.addEventListener(event, this.changeBtnIcon);
    });
    window.addEventListener("keydown", this.handleShortcuKey);
  }

  // Realize o bind do métodos
  bindEvents() {
    this.changeBtnIcon = this.changeBtnIcon.bind(this);
    this.handleShortcuKey = this.handleShortcuKey.bind(this);
  }

  init() {
    if (this.modalBtn && this.modal) {
      this.modalBtn.classList.add("js");
      this.setupEventListeners();
      this.updateAccessibility(false);
    }
    return this;
  }
}
