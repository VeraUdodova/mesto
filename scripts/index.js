// Объявление переменных
const popupElement = document.querySelector('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const nameProfileInput = popupElement.querySelector('.popup__form-input_name_username');
const statusProfileInput = popupElement.querySelector('.popup__form-input_name_status');
const openProfileButton = document.querySelector('.profile');
const popupProfileEditButtonElement = openProfileButton.querySelector('.profile__edit-button');
const popupProfileEditButtonContainer = document.querySelector('.popup__edit-container');
const profileNewName = document.querySelector('.profile__title');
const profileNewStatus = document.querySelector('.profile__subtitle');
const elementsSection = document.querySelector('.elements');
const popupEditProfile = document.querySelector('.popup-edit-profile-block');

//Константы для функции добавления картинок
const popupAddPhoto = document.querySelector('.popup-add-photo-block');
const addPopupElement = document.querySelector('.popup__add-container');
const openAddImageButtonElement = document.querySelector('.profile__add-photo-button');
const popupAddImageButtonContainer = document.querySelector('.popup__add-container');
const addImageTitleInput = document.querySelector('.popup__form-input_name_new-pic-title');
const addImageUrlInput = document.querySelector('.popup__form-input_name_new-pic-url');

//Константы для полноразмерных картинок
const popupFullSizeSection = document.querySelector('.popup-fullsize-pic-block')
const fullSizeContainer = document.querySelector('.popup__fullsize-pic-container');
const imgFullSizeElement = document.querySelector('.popup__fullsize-pic-image');
const titleFullSizeElement = document.querySelector('.popup__fullsize-pic-title');


//Первые 6 картинок
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// кнопка "Сохранить"
const handleEditFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileNewName.textContent = nameProfileInput.value;
    profileNewStatus.textContent = statusProfileInput.value;
    closePopup(event.target);

}

// кнопка "Создать" для добавления новых картинок
const handleAddFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    addCard(addImageTitleInput.value, addImageUrlInput.value);
    event.target.reset()
    closePopup(event.target);
    console.log('New picture added')
}

//Удаление картинки по нажатию на корзину
const handleImageDelete = function (event) {
    event.target.closest('.element').remove();
    console.log('delete clicked');
}

//Открываем полноразмерную картинку
const handleImageFullsizeOpen = function (name, link) {
    imgFullSizeElement.src = link;
    imgFullSizeElement.alt = name;
    titleFullSizeElement.textContent = name;
    openPopup(popupFullSizeSection);
}

//функция, которая открывает окошко
function openPopup(popup) {
    popup.classList.add('popup_opened');
    console.log('Open popup clicked');
}

//функция, которая закрывает окошко
function closePopup(popup) {
    popup.closest('.popup').classList.remove('popup_opened');
    console.log('Close popup clicked');
}

// функция закрытия окна по нажатию на крестик
closeButtons.forEach((button) => {
    button.addEventListener('click', () => closePopup(button));
});

//Добавление структуры для картинок
function addCard(name, link) {
    const elementTemplate = document.querySelector('#element').content;
    const NewPicCardElement = elementTemplate.querySelector('.element').cloneNode(true)
    const trashButton = NewPicCardElement.querySelector('.element__trash-button');
    const imgButton = NewPicCardElement.querySelector('.element__img-button');
    const imgElement = NewPicCardElement.querySelector('.element__photo');
    imgElement.src = link;
    imgElement.alt = name;
    const h2Element = NewPicCardElement.querySelector('.element__name');
    h2Element.textContent = name;
    const likeButton = NewPicCardElement.querySelector('.element__like-button');

    //Удаляем картинку по нажатию на корзину
    trashButton.addEventListener('click', handleImageDelete);

    //добавляем действие по клику на картинку
    imgButton.addEventListener("click", function () {
        handleImageFullsizeOpen(name, link);
    })

    //Нажатие на сердечко
    likeButton.addEventListener('click', function (event) {
            event.target.classList.toggle('elements__like-button_active');
            console.log('Like clicked');
        }
    )
    elementsSection.prepend(NewPicCardElement);
}

//Функция добавления первых 6 элементов
for (let i = 0; i <= 5; i = i + 1) {
    addCard(initialCards[i].name, initialCards[i].link);
}

//обработчик события
popupProfileEditButtonElement.addEventListener('click', function () {
    nameProfileInput.value = profileNewName.textContent;
    statusProfileInput.value = profileNewStatus.textContent;
    openPopup(popupEditProfile)
});

openAddImageButtonElement.addEventListener('click', function () {
    openPopup(popupAddPhoto)
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupProfileEditButtonContainer.addEventListener('submit', handleEditFormSubmit);
popupAddImageButtonContainer.addEventListener('submit', handleAddFormSubmit);
