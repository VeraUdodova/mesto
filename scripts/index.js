import {Card} from './Card.js'
// import {FormValidator} from './FormValidator.js'
import {Section} from './Section.js'
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";
import {PopupWithImage} from "./PopupWithImage.js";
// import {Popup} from './Popup.js'

// Объявление переменных
const closeButtons = document.querySelectorAll('.popup__close');
const nameProfileInput = document.querySelector('.popup__form-input_name_username');
const statusProfileInput = document.querySelector('.popup__form-input_name_status');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEditButtonContainer = document.querySelector('.popup__edit-container');
const profileNameSelector = '.profile__title';
const profileStatusSelector = '.profile__subtitle';
const selectorElements = '.elements';
const popupEditProfile = document.querySelector('.popup-edit-profile-block');
const formAddSelector = '.popup-add-photo-block';
const formEditSelector = '.popup-edit-profile-block';

//Константы для функции добавления картинок
const selectorTemplate = '#element';
const popupAddPhoto = document.querySelector('.popup-add-photo-block');
const openAddImageButton = document.querySelector('.profile__add-photo-button');
const popupAddImageButtonContainer = document.querySelector('.popup__add-container');
const addImageTitleInput = document.querySelector('.popup__form-input_name_new-pic-title');
const addImageUrlInput = document.querySelector('.popup__form-input_name_new-pic-url');

//Константы для полноразмерной картинки
const popupFullSizeSelector = '.popup-fullsize-pic-block';
const imgFullSizeElement = document.querySelector('.popup__fullsize-pic-image');
const titleFullSizeElement = document.querySelector('.popup__fullsize-pic-title');

//Константы для валидации
export const formInputElements = {
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
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByEscape);
// }
//
// //Закрытие popup при нажатии на клавишу Esc
// const closePopupByEscape = function (event) {
//     if (event.key === 'Escape') {
//         closePopup(document.querySelector('.popup_opened'))
//     }
// }

//Закрытие popup по клику на пустое поле
// const closePopupByOverlayClick = function (event) {
//     if (event.target.classList.contains('popup_opened')) {
//         closePopup(document.querySelector('.popup_opened'))
//     }
// }

//функция, которая открывает окошко
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupByEscape);
// }

//Открываем полноразмерную картинку
// function handleImageFullSizeOpen(name, link) {
//     imgFullSizeElement.src = link;
//     imgFullSizeElement.alt = name;
//     titleFullSizeElement.textContent = name;
//     openPopup(popupFullSizeSection);
// }


// функция закрытия окна по нажатию на крестик и overlay
// closeButtons.forEach(button => {
//     const popup = button.closest('.popup');
//     popup.addEventListener('mousedown', closePopupByOverlayClick);
//     button.addEventListener('click', () => closePopup(popup));
// })


//Валидация форм
// const formAddValidator = new FormValidator(formInputElements, formAddSelector)
// formAddValidator.enableValidation()
//
// const formEditValidator = new FormValidator(formInputElements, formEditSelector)
// formEditValidator.enableValidation()



// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
// popupProfileEditButtonContainer.addEventListener('submit', handleEditFormSubmit);
// popupAddImageButtonContainer.addEventListener('submit', handleAddFormSubmit);

//Функция добавления карточки в DOM
//убрано в Section
/*function prependCard(card) {
    elementsSection.prepend(card);
}
//Функция добавления первых 6 элементов
initialCards.forEach((card) => {
    prependCard(createCard(card.name, card.link));
});

function createCard(name, link) {
    const cardElement = new Card(name, link, selectorTemplate, handleImageFullSizeOpen)
    return cardElement.createCard()
}*/

const cardsList = new Section({
        items: initialCards, renderer: ({name, link}) => {
            const cardElement = new Card(name, link, selectorTemplate, (name, link)=>{
                const imagePopup=new PopupWithImage(popupFullSizeSelector)
                imagePopup.open(name, link)
            })
            cardsList.addItem(cardElement.createCard())
        }
    },
    selectorElements
);
cardsList.renderItems()

// // кнопка "Сохранить"
// const handleEditFormSubmit = function (event) {
//     event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//     profileName.textContent = nameProfileInput.value;
//     profileStatus.textContent = statusProfileInput.value;
//     closePopup(popupEditProfile);
// }
//
//
// // кнопка "Создать" для добавления новых картинок
// const handleAddFormSubmit = function (event) {
//     event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//     prependCard(createCard(addImageTitleInput.value, addImageUrlInput.value));
//     closePopup(popupAddPhoto);
// }

const userInfo = new UserInfo({nameSelector:profileNameSelector, infoSelector:profileStatusSelector})

const formEditPopup = new PopupWithForm(formEditSelector, (event) => {
    event.preventDefault();
    this._getInputValues();
    userInfo.setUserInfo(this._dataInputs[0], this._dataInputs[1])
    this.close()
})

const formAddPopup = new PopupWithForm(formAddSelector, (event) => {
    event.preventDefault();
    this._getInputValues();
    const cardElement = new Card(this._dataInputs[0], this._dataInputs[1], selectorTemplate, ()=>{})
    cardsList.addItem(cardElement.createCard())
    this.close()
})


// обработчик события
popupProfileEditButton.addEventListener('click', function () {
    formEditPopup.open()
    const {name,info} = userInfo.getUserInfo()
    nameProfileInput.value = name;
    statusProfileInput.value = info;
//     formEditValidator.resetValidation();
//     openPopup(popupEditProfile)
});

openAddImageButton.addEventListener('click', function () {
    formAddPopup.open()
    // formAddSelector.reset();
    // formAddValidator.resetValidation();
    // openPopup(popupAddPhoto)
});


formEditPopup.setEventListeners()
formAddPopup.setEventListeners()