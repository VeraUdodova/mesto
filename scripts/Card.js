import {openPopup} from "./index.js";

export class Card {
    constructor(name, link, elementTemplate) {
        this._name = name
        this._link = link
        this._elementTemplate = elementTemplate
    }

    //Добавление структуры для картинок
    createCard() {
        const newCardElement = this._elementTemplate.querySelector('.element').cloneNode(true);
        const trashButton = newCardElement.querySelector('.element__trash-button');
        const imgButton = newCardElement.querySelector('.element__img-button');
        const imgElement = newCardElement.querySelector('.element__photo');
        const h2Element = newCardElement.querySelector('.element__name');
        const likeButton = newCardElement.querySelector('.element__like-button');

        imgElement.src = this._link;
        imgElement.alt = this._name;
        h2Element.textContent = this._name;

        //Удаляем картинку по нажатию на корзину
        trashButton.addEventListener('click', ()=> {
            this._handleImageDelete()
        });

        //добавляем действие по клику на картинку
        imgButton.addEventListener('click', ()=>{
            this._handleImageFullSizeOpen()
        });


        //Нажатие на сердечко
        likeButton.addEventListener('click', function (event) {
            event.target.classList.toggle('elements__like-button_active');
            console.log('Like clicked');
        })

        return newCardElement
    }

    //Удаление картинки по нажатию на корзину
    _handleImageDelete (event) {
        event.target.closest('.element').remove();
        console.log('delete clicked');
    }

//Открываем полноразмерную картинку
    _handleImageFullSizeOpen () {
        const popupFullSizeSection = document.querySelector('.popup-fullsize-pic-block');
        const imgFullSizeElement = document.querySelector('.popup__fullsize-pic-image');
        const titleFullSizeElement = document.querySelector('.popup__fullsize-pic-title');
        imgFullSizeElement.src = this._link;
        imgFullSizeElement.alt = this._name;
        titleFullSizeElement.textContent = this._name;
        openPopup(popupFullSizeSection);
    }
}

