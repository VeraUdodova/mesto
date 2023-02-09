import {FormValidator} from './FormValidator.js'
import {formInputElements} from './сonstants.js'
import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector)
        this._submit = submit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formValidator = new FormValidator(formInputElements, this._popupForm)
        this._formInputs = this._popup.querySelectorAll('.popup__form-input');
        this._formValidator.enableValidation()
    }

    _getInputValues() {
        this._dataInputs = []
        this._formInputs.forEach(input => {
            this._dataInputs.push(input.value)
        })
    }

    setEventListeners() {
        super.setEventListeners();
        const popupContainer = this._popup.querySelector('.popup__container');
        popupContainer.addEventListener('submit', this._submit);
    }

    close() {
        super.close();
        this._popupForm.reset();
        this._formValidator.resetValidation()
    }
}