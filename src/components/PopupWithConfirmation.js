import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup{
    constructor(selector){
        super(selector)
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._cardId);
        })
    }

    open(cardId, handleFormSubmit){
        super.open();
        this._cardId = cardId
        this._handleFormSubmit = handleFormSubmit;
    }
}
