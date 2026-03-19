import BtnModal from "./modules/btn-modal.js";
import SettingsManager from "./modules/settings-manager.js";

const btnModal = new BtnModal("#modal-accessibility");
btnModal.init();

const seletores = [
  'input[name="theme-scheme"]',
  'input[name="font-size"]',
  'input[name="animation-preference"]',
];
const settingsManager = new SettingsManager(seletores);
settingsManager.init();
