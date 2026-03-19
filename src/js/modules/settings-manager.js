export default class SettingsManager {
  constructor(selectors, resetBtnSelector = "#modal-btn-reset") {
    this.inputs = document.querySelectorAll(selectors.join(", "));
    this.resetBtn = document.querySelector(resetBtnSelector);
    this.html = document.documentElement;
    this.storageKey = "userPreferences";

    // Estado Inicial
    this.defaultPreferences = {
      "theme-scheme": "auto",
      "font-size": "medium-text",
      "animation-preference": false,
    };

    this.preferences = { ...this.defaultPreferences };

    this.bindElements();
  }

  // Aplica as preferências no HTML (data-attributes e classes)
  applyPreferences() {
    // Tema
    const theme = this.preferences["theme-scheme"];
    if (theme === "auto") {
      delete this.html.dataset.theme;
    } else {
      this.html.dataset.theme = theme;
    }

    // Fonte
    this.html.dataset.fontSize = this.preferences["font-size"];

    // Animações
    if (this.preferences["animation-preference"]) {
      this.html.dataset.disableAnimations = "";
    } else {
      delete this.html.dataset.disableAnimations;
    }
  }

  // Salva no LocalStorage
  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
  }

  // Carrega do LocalStorage
  loadFromStorage() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.preferences = { ...this.preferences, ...JSON.parse(saved) };
      this.syncInputs();
      this.applyPreferences();
    }
  }

  // Sincroniza o estado dos inputs com o objeto this.preferences
  syncInputs() {
    this.inputs.forEach((input) => {
      const value = this.preferences[input.name];
      if (input.type === "radio") {
        input.checked = input.value === value;
        // Atualiza a classe active no label correspondente
        const label = document.querySelector(`label[for="${input.id}"]`);
        label?.classList.toggle("active", input.checked);
        console.log("ola");
      } else if (input.type === "checkbox") {
        input.checked = value;
      }
    });
  }

  handleInputChange({ target }) {
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.preferences[target.name] = value;

    this.applyPreferences();
    this.saveToStorage();
    this.syncInputs();
  }

  resetSettings() {
    this.preferences = { ...this.defaultPreferences };
    localStorage.removeItem(this.storageKey);
    this.applyPreferences();
    this.syncInputs();
  }

  // Adiciona o evento a todos os radios
  setupEventListeners() {
    this.inputs.forEach((input) => {
      // O evento 'change' dispara quando um elemento radio é selecionado
      input.addEventListener("change", this.handleInputChange);
    });
    this.resetBtn?.addEventListener("click", this.resetSettings);
  }

  // Realiza o bind das propriedades e metodos
  bindElements() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetSettings = this.resetSettings.bind(this);
  }

  init() {
    if (this.inputs.length) {
      this.loadFromStorage();
      this.setupEventListeners();
    }
    return this;
  }
}
