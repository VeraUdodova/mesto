// import {openPopup} from "./index.js";

export class Card {
    constructor(name, link, selectorTemplate, handleImageFullSizeOpen) {
        this._name = name;
        this._link = link;
        this._elementTemplate = document.querySelector(selectorTemplate).content;
        this._handleImageFullSizeOpen = handleImageFullSizeOpen;
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
        this._likeButton = this._newCardElement.querySelector('.element__like-button');

        //Удаляем картинку по нажатию на корзину
        trashButton.addEventListener('click', (event) => {
            this._handleImageDelete(event)
        });

        //добавляем действие по клику на картинку
        imgButton.addEventListener('click', () => {
            this._handleImageFullSizeOpen(this._name, this._link)
        });

        //Нажатие на сердечко
        this._likeButton.addEventListener('click', (event) => {
            this._handleLikeAction(event);
        })
    }


    //Удаление картинки по нажатию на корзину
    _handleImageDelete(event) {
        // event.target.closest('.element').remove();
        this._newCardElement.remove();
        this._newCardElement = null
    }

    // //Открываем полноразмерную картинку
    // _handleImageFullSizeOpen() {
    //     imgFullSizeElement.src = this._link;
    //     imgFullSizeElement.alt = this._name;
    //     titleFullSizeElement.textContent = this._name;
    //     openPopup(popupFullSizeSection);
    // }

    //Ставим лайк
    _handleLikeAction(event) {
        this._likeButton.classList.toggle('elements__like-button_active');
    }
}

