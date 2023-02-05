import {Popup} from './Popup.js'

export class PopupWithImage extends Popup{
    constructor(selector) {
        super(selector)
        this._popupFullSizeSection = this._popup.querySelector('.popup-fullsize-pic-block');
        this._imgFullSizeElement = this._popup.querySelector('.popup__fullsize-pic-image');
        this._titleFullSizeElement = this._popup.querySelector('.popup__fullsize-pic-title');
    }

    open(name, link){
        this._imgFullSizeElement.src = link;
        this._imgFullSizeElement.alt = name;
        this._titleFullSizeElement.textContent = name;
        super.open()
    }

}