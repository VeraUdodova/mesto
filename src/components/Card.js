export class Card {
    constructor(cardItem, userId, selectorTemplate,
                handleCardClick, handleCardDelete, handleCardLike,
                handleCardDislike, cardRemover) {
        this._name = cardItem.name;
        this._link = cardItem.link;
        this._likes = cardItem.likes;
        this._cardId = cardItem._id;
        this._ownerId = cardItem.owner._id;
        this._userId = userId
        this._elementTemplate = document.querySelector(selectorTemplate).content;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete
        this._handleCardLike = handleCardLike
        this._handleCardDislike = handleCardDislike

        this._cardRemover = cardRemover

    }

    //Добавление структуры для картинок
    createCard() {
        this._createLayout();
        this._setEventListeners();
        return this._newCardElement;
    }

    _createLayout() {
        this._newCardElement = this._elementTemplate.querySelector('.element').cloneNode(true);
        this._likeButton = this._newCardElement.querySelector('.element__like-button');
        this._trashButton = this._newCardElement.querySelector('.element__trash-button');
        this._imgElement = this._newCardElement.querySelector('.element__photo');
        const imgElementTitle = this._newCardElement.querySelector('.element__name');
        this._imgLikesCounter = this._newCardElement.querySelector('.element__likes');

        this._imgElement.src = this._link;
        this._imgElement.alt = this._name;
        imgElementTitle.textContent = this._name;
        this.setLikeCounter(this._likes.length)
        if(this._isUserIdInLikes()){
            this._handleLikeAction()
        }
        // this._imgLikesCounter.textContent = this._likes.length;

        if (this._ownerId !== this._userId) {
            this._trashButton.remove()
            this._trashButton = null
        }
    }

    _setEventListeners() {

        //Удаляем картинку по нажатию на корзину
        if (this._ownerId === this._userId) {
            this._trashButton.addEventListener('click', () => {
                this._handleCardDelete(this._cardId)
            });
        }

        //добавляем действие по клику на картинку
        this._imgElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });

        //Нажатие на сердечко
        this._likeButton.addEventListener('click', (event) => {
            if (this._isUserIdInLikes()) {
                this._handleCardLike(this._cardId);
            } else {
                this._handleCardDislike(this._cardId)
            }
            this._handleLikeAction()
        })
    }

    setLikes(likes) {
        this._likes = likes
    }

    setLikeCounter(likesCount) {
        this._imgLikesCounter.textContent = likesCount
    }

    //Удаление картинки по нажатию на корзину
    handleImageDelete() {
        this._newCardElement.remove();
        this._newCardElement = null
    }

    //Ставим лайк
    _handleLikeAction() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    _isUserIdInLikes () {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._userId === this._likes[i]._id) {
                return true
            }
        }
        return false
    }
}
