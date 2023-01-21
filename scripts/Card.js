import {openPopup} from "./index.js";

export class Card {
    constructor(name, link, elementTemplate) {
        this._name = name;
        this._link = link;
        this._elementTemplate = elementTemplate;
    }

    //Добавление структуры для картинок
    createCard() {
        this._createLayout();
        this._setEventListeners();
        return this._newCardElement;
    }

    _createLayout() {
        this._newCardElement = this._elementTemplate.querySelector('.element').cloneNode(true);
        const imgElement = this._newCardElement.querySelector('.element__photo');
        const h2Element = this._newCardElement.querySelector('.element__name');

        imgElement.src = this._link;
        imgElement.alt = this._name;
        h2Element.textContent = this._name;
    }

    _setEventListeners() {
        const trashButton = this._newCardElement.querySelector('.element__trash-button');
        const imgButton = this._newCardElement.querySelector('.element__img-button');
        const likeButton = this._newCardElement.querySelector('.element__like-button');

        //Удаляем картинку по нажатию на корзину
        trashButton.addEventListener('click', (event) => {
            this._handleImageDelete(event)
        });

        //добавляем действие по клику на картинку
        imgButton.addEventListener('click', () => {
            this._handleImageFullSizeOpen()
        });

        //Нажатие на сердечко
        likeButton.addEventListener('click', (event) => {
            this._handleLikeAction(event);
        })
    }


    //Удаление картинки по нажатию на корзину
    _handleImageDelete(event) {
        event.target.closest('.element').remove();
        console.log('delete clicked');
    }

    //Открываем полноразмерную картинку
    _handleImageFullSizeOpen() {
        const popupFullSizeSection = document.querySelector('.popup-fullsize-pic-block');
        const imgFullSizeElement = document.querySelector('.popup__fullsize-pic-image');
        const titleFullSizeElement = document.querySelector('.popup__fullsize-pic-title');
        imgFullSizeElement.src = this._link;
        imgFullSizeElement.alt = this._name;
        titleFullSizeElement.textContent = this._name;
        openPopup(popupFullSizeSection);
    }

    //Ставим лайк
    _handleLikeAction(event) {
        event.target.classList.toggle('elements__like-button_active');
        console.log('Like clicked');
    }
}

