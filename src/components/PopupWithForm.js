import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit, handleFormClose) {
        super(selector)
        this._handleFormSubmit = handleFormSubmit;
        this._handleFormClose = handleFormClose;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._buttonSaveElement = this._popup.querySelector('.popup__form-save')
    }

    _getInputValues() {
        this._formInputs = this._popup.querySelectorAll('.popup__form-input');
        this._formValues = {}
        this._formInputs.forEach(input => {
            this._formValues[input.name] = input.value
        })
        return this._formValues
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._oldText = this._buttonSaveElement.textContent
            this._buttonSaveElement.textContent = 'Сохранение...'
        } else {
            this._buttonSaveElement.textContent = this._oldText
        }
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.renderLoading(true)
            this._handleFormSubmit(this._getInputValues());
            this._popupForm.reset();
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
        this._handleFormClose()
    }
}