import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {initialCards, formInputElements} from "../components/сonstants.js";
import {FormValidator} from '../components/FormValidator.js'
import {Api} from "../components/Api.js";
import './index.css';

// Объявление переменных
const nameProfileInput = document.querySelector('.popup__form-input_name_username');
const statusProfileInput = document.querySelector('.popup__form-input_name_status');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const profileNameSelector = '.profile__title';
const profileStatusSelector = '.profile__subtitle';
const profileAvatarSelector='.profile__photo'
const selectorElements = '.elements';
const formAddSelector = '.popup-add-photo-block';
const formEditSelector = '.popup-edit-profile-block';
const formAddElement = document.querySelector('.popup-add-photo-block')
const formEditElement = document.querySelector('.popup-edit-profile-block')


//Константы для функции добавления картинок
const selectorTemplate = '#element';
const openAddImageButton = document.querySelector('.profile__add-photo-button');

//Константы для полноразмерной картинки
const popupFullSizeSelector = '.popup-fullsize-pic-block';

//Данные юзера
let userId


const imagePopup = new PopupWithImage(popupFullSizeSelector)
imagePopup.setEventListeners()

const createCard = function (name, link) {
    const cardElement = new Card(name, link, selectorTemplate, (name, link) => {
        imagePopup.open(name, link)
    })
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

const userInfo = new UserInfo({
    nameSelector: profileNameSelector, infoSelector: profileStatusSelector, avatarSelector:profileAvatarSelector
})

const formEditPopup = new PopupWithForm(formEditSelector, (formData) => {
        api.editUserInfo({name: formData.form_profile_name, about: formData.form_profile_status}).then((data)=>{
            userInfo.setUserInfo({form_profile_name: data.name, form_profile_status: data.about})
            formEditPopup.close()
        }).catch(catchError)

    }, () => {
        formEditValidator.resetValidation();
    }
)

const formAddPopup = new PopupWithForm(formAddSelector, (formData) => {
    cardsList.addItem(createCard(formData.form_place_name, formData.form_place_url))
    formAddPopup.close()
}, () => {
    formAddValidator.resetValidation();
})


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '9c0d462a-ebab-4e58-8ffe-ae1eb4d8348f',
        'Content-Type': 'application/json'
    }
});

function catchError(err){
    console.log(err)
}

api.getUserInfo()
    .then((data) => {
        userId=data._id
        console.log(data)
        userInfo.setUserInfo({form_profile_name: data.name, form_profile_status: data.about, avatar:data.avatar})
    })
    .catch(catchError)

api.getInitialCards()
    .then((data) => {
        data.forEach((item)=>{
            cardsList.addItem(createCard(item.name, item.link))
        })
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

cardsList.renderItems()
formEditPopup.setEventListeners()
formAddPopup.setEventListeners()
formAddValidator.enableValidation()
formEditValidator.enableValidation()
