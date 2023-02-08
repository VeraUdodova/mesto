import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {initialCards} from "../components/Constants.js";
import './index.css';

// Объявление переменных
const nameProfileInput = document.querySelector('.popup__form-input_name_username');
const statusProfileInput = document.querySelector('.popup__form-input_name_status');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const profileNameSelector = '.profile__title';
const profileStatusSelector = '.profile__subtitle';
const selectorElements = '.elements';
const formAddSelector = '.popup-add-photo-block';
const formEditSelector = '.popup-edit-profile-block';

//Константы для функции добавления картинок
const selectorTemplate = '#element';
const openAddImageButton = document.querySelector('.profile__add-photo-button');

//Константы для полноразмерной картинки
const popupFullSizeSelector = '.popup-fullsize-pic-block';

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

const userInfo = new UserInfo({nameSelector:profileNameSelector, infoSelector:profileStatusSelector})

const formEditPopup = new PopupWithForm(formEditSelector, (event) => {
    event.preventDefault();
    formEditPopup._getInputValues();
    userInfo.setUserInfo(formEditPopup._dataInputs[0], formEditPopup._dataInputs[1])
    formEditPopup.close()
})

const formAddPopup = new PopupWithForm(formAddSelector, (event) => {
    event.preventDefault();
    formAddPopup._getInputValues();
    const cardElement = new Card(formAddPopup._dataInputs[0], formAddPopup._dataInputs[1], selectorTemplate, (name, link)=>{
        const imagePopup=new PopupWithImage(popupFullSizeSelector)
        imagePopup.open(name, link)
    })
    cardsList.addItem(cardElement.createCard())
    formAddPopup.close()
})


// обработчик события
popupProfileEditButton.addEventListener('click', function () {
    formEditPopup.open()
    const {name,info} = userInfo.getUserInfo()
    nameProfileInput.value = name;
    statusProfileInput.value = info;
});

openAddImageButton.addEventListener('click', function () {
    formAddPopup.open()
});

cardsList.renderItems()
formEditPopup.setEventListeners()
formAddPopup.setEventListeners()