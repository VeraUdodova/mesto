import {Card} from './Card.js'

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

//Константы для функции добавления картинок
const elementTemplate = document.querySelector('#element').content;
const popupAddPhoto = document.querySelector('.popup-add-photo-block');
const openAddImageButton = document.querySelector('.profile__add-photo-button');
const popupAddImageButtonContainer = document.querySelector('.popup__add-container');
const addImageTitleInput = document.querySelector('.popup__form-input_name_new-pic-title');
const addImageUrlInput = document.querySelector('.popup__form-input_name_new-pic-url');

//Константы для полноразмерных картинок
// const popupFullSizeSection = document.querySelector('.popup-fullsize-pic-block');
// const imgFullSizeElement = document.querySelector('.popup__fullsize-pic-image');
// const titleFullSizeElement = document.querySelector('.popup__fullsize-pic-title');


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
    popup.closest('.popup').classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
    document.removeEventListener('mousedown', closePopupByOverlayClick);
    console.log('Close popup clicked');
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
        closePopup(event.target)
    }
}

//функция, которая открывает окошко
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
    document.addEventListener('mousedown', closePopupByOverlayClick);
    console.log('Open popup clicked');
}

//Добавление структуры для картинок
// function createCard(name, link) {
//     const newCardElement = elementTemplate.querySelector('.element').cloneNode(true);
//     const trashButton = newCardElement.querySelector('.element__trash-button');
//     const imgButton = newCardElement.querySelector('.element__img-button');
//     const imgElement = newCardElement.querySelector('.element__photo');
//     const h2Element = newCardElement.querySelector('.element__name');
//     const likeButton = newCardElement.querySelector('.element__like-button');
//
//     imgElement.src = link;
//     imgElement.alt = name;
//     h2Element.textContent = name;
//
//     //Удаляем картинку по нажатию на корзину
//     trashButton.addEventListener('click', handleImageDelete);
//     //добавляем действие по клику на картинку
//     imgButton.addEventListener('click', function () {
//         handleImageFullSizeOpen(name, link);
//     })
//     //Нажатие на сердечко
//     likeButton.addEventListener('click', function (event) {
//         event.target.classList.toggle('elements__like-button_active');
//         console.log('Like clicked');
//     })
//
//     return newCardElement
// }

//Функция добавления карточки в DOM
function prependCard(card) {
    elementsSection.prepend(card);
}

// кнопка "Сохранить"
const handleEditFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameProfileInput.value;
    profileStatus.textContent = statusProfileInput.value;
    closePopup(event.target);
}

// кнопка "Создать" для добавления новых картинок
const handleAddFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const cardElement =  new Card(addImageTitleInput.value, addImageUrlInput.value, elementTemplate)
    prependCard(cardElement.createCard());
    event.target.reset();
    console.log(event.target);
    closePopup(event.target);
    console.log('New picture added');
}

//Удаление картинки по нажатию на корзину
// const handleImageDelete = function (event) {
//     event.target.closest('.element').remove();
//     console.log('delete clicked');
// }
//
// //Открываем полноразмерную картинку
// const handleImageFullSizeOpen = function (name, link) {
//     imgFullSizeElement.src = link;
//     imgFullSizeElement.alt = name;
//     titleFullSizeElement.textContent = name;
//     openPopup(popupFullSizeSection);
// }

// функция закрытия окна по нажатию на крестик
closeButtons.forEach((button) => {
    button.addEventListener('click', () => closePopup(button));
});

//Функция добавления первых 6 элементов
initialCards.forEach((card) => {
    const cardElement =  new Card(card.name, card.link, elementTemplate)
    prependCard(cardElement.createCard());
});

//обработчик события
popupProfileEditButton.addEventListener('click', function () {
    nameProfileInput.value = profileName.textContent;
    statusProfileInput.value = profileStatus.textContent;
    openPopup(popupEditProfile)
});

openAddImageButton.addEventListener('click', function () {
    openPopup(popupAddPhoto)
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupProfileEditButtonContainer.addEventListener('submit', handleEditFormSubmit);
popupAddImageButtonContainer.addEventListener('submit', handleAddFormSubmit);
