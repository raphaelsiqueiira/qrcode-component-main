import BtnModal from "./modules/btn-modal.js";
import SettingsRadioManager from "./modules/settings-radio-manager.js";

const btnModal = new BtnModal("#btn-accessibility", "#modal-acessibility");
btnModal.init();

const settingsRadioManager = new SettingsRadioManager([
  'input[name="theme-scheme"]',
  'input[name="font-size"]',
]);
settingsRadioManager.init();
