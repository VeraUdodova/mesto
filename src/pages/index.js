import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {initialCards} from "../components/сonstants.js";
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
                imagePopup.setEventListeners()
                imagePopup.open(name, link)
            })
            cardsList.addItem(cardElement.createCard())
        }
    },
    selectorElements
);

const userInfo = new UserInfo({nameSelector:profileNameSelector, infoSelector:profileStatusSelector})

const formEditPopup = new PopupWithForm(formEditSelector, (formData) => {
    userInfo.setUserInfo(formData)
    formEditPopup.close()
})

const formAddPopup = new PopupWithForm(formAddSelector, (formData) => {
    const cardElement = new Card(formData.form_place_name, formData.form_place_url, selectorTemplate, (name, link)=>{
        const imagePopup=new PopupWithImage(popupFullSizeSelector)
        imagePopup.setEventListeners()//TODO и без этого работает
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
