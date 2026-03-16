import BtnModal from "./modules/btn-modal.js";
import ModalOptionsRadioControl from "./modules/modal-radio-control.js";

const btnModal = new BtnModal("#btn-accessibility", "#modal-acessibility");
btnModal.init();

const modalOptionsRadioControl = new ModalOptionsRadioControl([
  'input[name="theme-scheme"]',
  'input[name="font-size"]',
]);
modalOptionsRadioControl.init();
