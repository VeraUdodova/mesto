const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled')
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled')
    }
};

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);

    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, obj);
        }, 0);
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            console.log('submit')
            evt.preventDefault();
        });
        setEventListeners(formElement, obj);
    });
};

enableValidation({
    formSelector: '.popup__form',
    formFieldsetSelector: '.popup__form-set',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__form-input-error',
    errorClass: 'popup__error_visible'
});
