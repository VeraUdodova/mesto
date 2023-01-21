export class FormValidator {
    constructor(obj, formSelector) {
        this._obj = obj;
        this._formSelector = formSelector;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._obj.inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'disabled')
        } else {
            buttonElement.classList.remove(this._obj.inactiveButtonClass);
            buttonElement.removeAttribute('disabled')
        }
    };

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._obj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._obj.errorClass);
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._obj.inputErrorClass);
        errorElement.classList.remove(this._obj.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._obj.inputSelector));
        const buttonElement = formElement.querySelector(this._obj.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);

        formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement);
            }, 0);
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                console.log('submit')
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    };

}

const objClasses = {
    formFieldsetSelector: '.popup__form-set',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__form-input-error',
    errorClass: 'popup__error_visible'
}

const addFormValidator = new FormValidator(objClasses,'.popup__add-form')
addFormValidator.enableValidation()

const editFormValidator = new FormValidator(objClasses,'.popup__edit-form')
editFormValidator.enableValidation()

