import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {
    initialCards,
    formInputElements
} from "../components/сonstants.js";
import {FormValidator} from '../components/FormValidator.js'
import {Api} from "../components/Api.js";
import './index.css';
import {
    PopupWithConfirmation
} from "../components/PopupWithConfirmation";

// Объявление переменных
const nameProfileInput = document.querySelector('.popup__form-input_name_username');
const statusProfileInput = document.querySelector('.popup__form-input_name_status');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const profileNameSelector = '.profile__title';
const profileStatusSelector = '.profile__subtitle';
const profileAvatarSelector = '.profile__photo'
const profileAvatarElement = document.querySelector(profileAvatarSelector)
const selectorElements = '.elements';
const formAddSelector = '.popup-add-photo-block';
const formAddElement = document.querySelector(formAddSelector)
const formEditSelector = '.popup-edit-profile-block';
const formEditElement = document.querySelector(formEditSelector)
const warningSelector = '.popup-warning-block'
const warningElement = document.querySelector(warningSelector)
const formAvatarSelector = '.popup-avatar-block';
const formAvatarElement = document.querySelector(formAvatarSelector)

//Константы для функции добавления картинок
const selectorTemplate = '#element';
const openAddImageButton = document.querySelector('.profile__add-photo-button');

//Константы для полноразмерной картинки
const popupFullSizeSelector = '.popup-fullsize-pic-block';

//Данные юзера
let userId


const imagePopup = new PopupWithImage(popupFullSizeSelector)
imagePopup.setEventListeners()

const createCard = function (cardItem) {
    const cardElement = new Card(cardItem, userId, selectorTemplate, (name, link) => {
            imagePopup.open(name, link)
        },
        (cardId) => {
            formWarningPopup.open(cardId, (cardId) => {
                api.deleteCard(cardId).then((data) => {
                    cardElement.handleImageDelete()
                    formWarningPopup.close()
                }).catch(catchError)
            })
            // console.log(event.srcElement)
        },
        (cardId) => {
            api.deleteLike(cardId).then((data) => {
                cardElement.setLikes(data.likes)
                cardElement.setLikeCounter(data.likes.length)
            })
        },
        (cardId) => {
            api.addLike(cardId).then((data) => {
                cardElement.setLikes(data.likes)
                cardElement.setLikeCounter(data.likes.length)
            })
        }
    )
    return cardElement.createCard()
}

const cardsList = new Section({
        items: [], renderer: ({name, link}) => {
            cardsList.addItem(createCard(name, link))
        }
    },
    selectorElements
);

const formEditValidator = new FormValidator(formInputElements, formEditElement)
const formAddValidator = new FormValidator(formInputElements, formAddElement)
const formAvatarValidator = new FormValidator(formInputElements, formAvatarElement)

const userInfo = new UserInfo({
    nameSelector: profileNameSelector,
    infoSelector: profileStatusSelector,
    avatarSelector: profileAvatarSelector
})
const formWarningPopup = new PopupWithConfirmation(warningSelector)
formWarningPopup.setEventListeners()


const formEditPopup = new PopupWithForm(formEditSelector,
    (formData) => {
        api.editUserInfo({
            name: formData.form_profile_name,
            about: formData.form_profile_status
        }).then((data) => {
            userInfo.setUserInfo({
                form_profile_name: data.name,
                form_profile_status: data.about
            })
            formEditPopup.close()
            formEditPopup.renderLoading(false)
        }).catch(catchError)
    }, () => {
        formEditValidator.resetValidation();
    }
)

const formAddPopup = new PopupWithForm(formAddSelector,
    (formData) => {
        api.addNewCard({
            name: formData.form_place_name,
            link: formData.form_place_url
        }).then((data) => {
            cardsList.addItem(createCard(data))
            formAddPopup.close()
            formAddPopup.renderLoading(false)
        })
            .catch(catchError)
    }, () => {
        formAddValidator.resetValidation();
    })

const formAvatarPopup = new PopupWithForm(formAvatarSelector,
    (formData) => {
        api.editAvatar({avatar: formData.form_avatar_url})
            .then((data) => {
                userInfo.setNewAvatar(data.avatar)
                formAvatarPopup.close()
                formAvatarPopup.renderLoading(false)
            })
            .catch(catchError)
    }, () => {
        formAvatarValidator.resetValidation();
    })


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '9c0d462a-ebab-4e58-8ffe-ae1eb4d8348f',
        'Content-Type': 'application/json'
    }
});

function catchError(err) {
    console.log(err)
}

api.getUserInfo()
    .then((data) => {
        userId = data._id
        userInfo.setUserInfo({
            form_profile_name: data.name,
            form_profile_status: data.about,
        })
        userInfo.setNewAvatar(data.avatar)
        api.getInitialCards()
            .then((data) => {
                data.forEach((item) => {
                    cardsList.appendItem(createCard(item))
                })
            })
            .catch(catchError)
    })
    .catch(catchError)



// обработчик события
popupProfileEditButton.addEventListener('click', function () {
    formEditPopup.open()
    const {name, info} = userInfo.getUserInfo()
    nameProfileInput.value = name;
    statusProfileInput.value = info;
});

openAddImageButton.addEventListener('click', function () {
    formAddPopup.open()
});

profileAvatarElement.addEventListener('click', function () {
    formAvatarPopup.open()
});

// cardsList.renderItems()
formEditPopup.setEventListeners()
formAddPopup.setEventListeners()
formAvatarPopup.setEventListeners()
formAddValidator.enableValidation()
formEditValidator.enableValidation()
formAvatarValidator.enableValidation()
