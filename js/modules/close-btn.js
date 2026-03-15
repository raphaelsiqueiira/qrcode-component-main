export default class CloseBtn {
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

    this.bindEvents();
  }

  changeBtnIcon(event) {
    // evita de emular o 'click' no mobile, executando apenas o 'touchstart'
    if (event.type === "touchstart") event.preventDefault();

    const isActive = this.modalBtn.classList.toggle(this.activeClass);
    this.changeVisibiliteModal(isActive);
    this.updateAccessibility(isActive);
    if (isActive) {
      this.focusOnActive(true);
    } else {
      this.focusOnActive(false);
    }
  }

  changeVisibiliteModal(isActive) {
    this.modal.style.display = isActive ? "flex" : "none";
  }

  updateAccessibility(isActive) {
    this.modalBtn.setAttribute("aria-expanded", isActive);
    this.modal.setAttribute("aria-hidden", !isActive);
  }

  focusOnActive(isActive) {
    if (isActive) {
      this.modal.setAttribute("tabindex", "-1");
      this.modal.focus();
      document.querySelector("main").setAttribute("inert", "");
    } else {
      this.modalBtn.focus();
      document.querySelector("main").removeAttribute("inert", "");
    }
  }

  addEventBtn() {
    this.events.forEach((event) => {
      this.modalBtn.addEventListener(event, this.changeBtnIcon);
    });
  }

  bindEvents() {
    this.changeBtnIcon = this.changeBtnIcon.bind(this);
  }

  init() {
    if (this.modalBtn && this.modal) {
      this.addEventBtn();
      this.updateAccessibility(false);
    }
    return this;
  }
}
