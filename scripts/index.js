// кнопка закрытия всплывающего окошка
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

// кнопка открытия всплывающего окошка
const openButton = document.querySelector('.profile');
const popupOpenButtonElement = openButton.querySelector('.profile__edit-button');
let nameInput = popupElement.querySelector('.popup__form-input_name_username')
let statusInput = popupElement.querySelector('.popup__form-input_name_status')
let newName = document.querySelector('.profile__title');
let newStatus = document.querySelector('.profile__subtitle');

//функция, которая открывает и закрывает окошко
const openPopup = function (event) {
    nameInput.value=newName.textContent;
    statusInput.value=newStatus.textContent;
    popupElement.classList.add('popup__is-open');
    console.log('Open popup clicked');
    }
const closePopup = function () {
    popupElement.classList.remove('popup__is-open');
    console.log('Close popup clicked');
}

//обработчик события
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

//Функция, которая закрашивает сердечко
let heartElements = document.querySelectorAll('.element__like-button')

const heartElementEnabler = function (event) {
    event.target.classList.add('elements__like-button_active');
    console.log('Like clicked');
}

for (let i = 0; i < heartElements.length; i++) {
    heartElements[i].addEventListener('click', heartElementEnabler);
}


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    newName.textContent = nameInput.value;
    newStatus.textContent = statusInput.value;
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupElement.addEventListener('submit', handleFormSubmit);