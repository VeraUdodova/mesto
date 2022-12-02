// Объявление переменных
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const nameInput = popupElement.querySelector('.popup__form-input_name_username');
const statusInput = popupElement.querySelector('.popup__form-input_name_status');
const openButton = document.querySelector('.profile');
const popupOpenButtonElement = openButton.querySelector('.profile__edit-button');
const newName = document.querySelector('.profile__title');
const newStatus = document.querySelector('.profile__subtitle');


//функция, которая открывает и закрывает окошко
const openPopup = function () {
    nameInput.value = newName.textContent;
    statusInput.value = newStatus.textContent;
    popupElement.classList.add('popup_opened');
    console.log('Open popup clicked');
}
const closePopup = function () {
    popupElement.classList.remove('popup_opened');
    console.log('Close popup clicked');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
const handleFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    newName.textContent = nameInput.value;
    newStatus.textContent = statusInput.value;
    closePopup()
}

//обработчик события
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupElement.addEventListener('submit', handleFormSubmit);
