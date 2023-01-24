export class FormValidator {
    constructor(obj, formElement) {
        this._obj = obj;
        this._formElement = formElement;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._obj.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'disabled')
        } else {
            this._buttonElement.classList.remove(this._obj.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled')
        }
    };

    _showInputError(errorMessage) {
        const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        this._inputElement.classList.add(this._obj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._obj.errorClass);
    };

    _hideInputError() {
        const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        this._inputElement.classList.remove(this._obj.inputErrorClass);
        errorElement.classList.remove(this._obj.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity() {
        if (!this._inputElement.validity.valid) {
            this._showInputError(this._inputElement.validationMessage);
        } else {
            this._hideInputError();
        }
    };

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._obj.submitButtonSelector);
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._inputElement = inputElement;
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._inputElement = inputElement;
            this._hideInputError()
        });
    }
}
