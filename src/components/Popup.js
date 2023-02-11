export class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._buttonClose = this._popup.querySelector('.popup__close')
        this._handleEscClose = this._handleEscClose.bind(this)
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    _handleOverlayClickClose(event) {
        if (event.target.classList.contains('popup_opened')) {
            this.close()
        }
    }


    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.addEventListener('mousedown', this._handleOverlayClickClose.bind(this));
        this._buttonClose.addEventListener('click', () => this.close());
    };
}
