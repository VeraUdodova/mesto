import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

// Объявление переменных
const closeButtons = document.querySelectorAll('.popup__close');
const nameProfileInput = document.querySelector('.popup__form-input_name_username');
const statusProfileInput = document.querySelector('.popup__form-input_name_status');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEditButtonContainer = document.querySelector('.popup__edit-container');
const profileName = document.querySelector('.profile__title');
const profileStatus = document.querySelector('.profile__subtitle');
const elementsSection = document.querySelector('.elements');
const popupEditProfile = document.querySelector('.popup-edit-profile-block');
const formAddElement = document.querySelector('.popup__add-form');
const formEditElement = document.querySelector('.popup__edit-form');

//Константы для функции добавления картинок
const selectorTemplate = '#element';
const popupAddPhoto = document.querySelector('.popup-add-photo-block');
const openAddImageButton = document.querySelector('.profile__add-photo-button');
const popupAddImageButtonContainer = document.querySelector('.popup__add-container');
const addImageTitleInput = document.querySelector('.popup__form-input_name_new-pic-title');
const addImageUrlInput = document.querySelector('.popup__form-input_name_new-pic-url');

//Константы для полноразмерной картинки
const popupFullSizeSection = document.querySelector('.popup-fullsize-pic-block');
const imgFullSizeElement = document.querySelector('.popup__fullsize-pic-image');
const titleFullSizeElement = document.querySelector('.popup__fullsize-pic-title');

//Константы для валидации
const formInputElements = {
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__form-input-error',
    errorClass: 'popup__error_visible'
}


//Первые 6 картинок
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//функция, которая закрывает окошко
function closePopup(popup) {
    // popup.closest('.popup').classList.remove('popup_opened');
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
    document.removeEventListener('mousedown', closePopupByOverlayClick);
}

//Закрытие popup при нажатии на клавишу Esc
const closePopupByEscape = function (event) {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }
}

//Закрытие popup по клику на пустое поле
const closePopupByOverlayClick = function (event) {
    if (event.target.classList.contains('popup_opened')) {
        closePopup(document.querySelector('.popup_opened'))
    }
}

//функция, которая открывает окошко
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
    popup.addEventListener('mousedown', closePopupByOverlayClick);
}

//Открываем полноразмерную картинку
function handleImageFullSizeOpen(name, link) {
    imgFullSizeElement.src = link;
    imgFullSizeElement.alt = name;
    titleFullSizeElement.textContent = name;
    openPopup(popupFullSizeSection);
}


//Функция добавления карточки в DOM
function prependCard(card) {
    elementsSection.prepend(card);
}

// кнопка "Сохранить"
const handleEditFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameProfileInput.value;
    profileStatus.textContent = statusProfileInput.value;
    closePopup(popupEditProfile);
}

// кнопка "Создать" для добавления новых картинок
const handleAddFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const cardElement =  new Card(addImageTitleInput.value, addImageUrlInput.value, selectorTemplate, handleImageFullSizeOpen)
    prependCard(cardElement.createCard());
    // event.target.reset();
    closePopup(popupAddPhoto);
}


// функция закрытия окна по нажатию на крестик
closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(document.querySelector('.popup_opened'))
    });
});

//Функция добавления первых 6 элементов
initialCards.forEach((card) => {
    const cardElement =  new Card(card.name, card.link, selectorTemplate, handleImageFullSizeOpen)
    prependCard(cardElement.createCard());
});

//Валидация форм
const formAddValidator = new FormValidator(formInputElements,formAddElement)
formAddValidator.enableValidation()

const formEditValidator = new FormValidator(formInputElements,formEditElement)
formEditValidator.enableValidation()


//обработчик события
popupProfileEditButton.addEventListener('click', function () {
    nameProfileInput.value = profileName.textContent;
    statusProfileInput.value = profileStatus.textContent;
    openPopup(popupEditProfile)
});

openAddImageButton.addEventListener('click', function () {
    formAddElement.reset();
    formAddElement.querySelector("button[type='submit']").setAttribute('disabled', 'disabled')
    openPopup(popupAddPhoto)
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupProfileEditButtonContainer.addEventListener('submit', handleEditFormSubmit);
popupAddImageButtonContainer.addEventListener('submit', handleAddFormSubmit);
