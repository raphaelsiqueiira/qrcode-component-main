export default class SettingsRadioManager {
  constructor(selector, activeClass = "active") {
    const domElements = document.querySelectorAll(selector);

    if (!domElements || domElements.length === 0) {
      console.warn(
        `SettingsRadioManager: Nenhum elemento encontrado para o seletor "${selector}"`
      );
      this.radioInputs = [];
    } else {
      this.radioInputs = [...domElements];
    }
    this.activeClass = activeClass;
    this.userPreferences = {};
    this.bindElements();
  }

  // aplica os atributos de preferencia para controlar estilo
  renderAttributes() {
    const htmlElement = document.documentElement;
    for (const attr in this.userPreferences) {
      const value = this.userPreferences[attr];

      if (attr === "theme-scheme" && value === "auto") {
        htmlElement.removeAttribute(attr);
      } else {
        htmlElement.setAttribute(attr, value);
      }
    }
  }

  // Atualiza o objeto que salva a configurações de preferência
  savePreference(element) {
    const keyAttr = element.name;
    const valueAttr = element.value;
    this.userPreferences[keyAttr] = valueAttr;
    this.renderAttributes();
    this.setConfigLocalStorage();
  }

  // Grava as preferencias definidas no localStorage
  setConfigLocalStorage() {
    const configJson = JSON.stringify(this.userPreferences);
    localStorage.setItem("userPreferences", configJson);
  }

  // Recupera as preferencias definidas no localStorage
  getConfigLocalStorage() {
    const jsonObject = localStorage.getItem("userPreferences");
    if (jsonObject) {
      this.userPreferences = JSON.parse(jsonObject);
    }
  }

  // Sincroniza o estado dos inputs com as preferências salvas
  syncInputsFromState() {
    this.radioInputs.forEach((radio) => {
      const savedValue = this.userPreferences[radio.name];
      if (radio.value === savedValue) {
        radio.checked = true;
      }
    });
  }

  // Adiciona a classe de ativação e o checked no radio
  toggleVisualState() {
    // Percorre todos os radios
    this.radioInputs.forEach((radio) => {
      // Busca o label vinculado ao ID do rádio atual
      const labelElement = document.querySelector(`label[for="${radio.id}"]`);
      if (!labelElement) return;
      if (radio.checked) {
        labelElement.classList.add(this.activeClass);
        this.savePreference(radio);
      } else {
        labelElement.classList.remove(this.activeClass);
      }
    });
  }

  // Adiciona o evento a todos os radios
  setupEventListeners() {
    this.radioInputs.forEach((element) => {
      // O evento 'change' dispara quando um elemento radio é selecionado
      element.addEventListener("change", this.toggleVisualState);
    });
  }

  // Realiza o bind das propriedades e metodos
  bindElements() {
    this.setupEventListeners = this.setupEventListeners.bind(this);
    this.toggleVisualState = this.toggleVisualState.bind(this);
  }

  init() {
    if (this.radioInputs.length > 0) {
      this.getConfigLocalStorage();
      this.syncInputsFromState();
      this.renderAttributes();
      this.setupEventListeners();
      this.toggleVisualState(); // Executa uma vez para marcar o checked padrão
    } else {
      console.error("Falha ao inicializar: Lista de elementos vazia.");
    }
    return this;
  }
}
