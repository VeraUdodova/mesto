// Объявление переменных
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelectorAll('.popup__close');
const nameProfileInput = popupElement.querySelector('.popup__form-input_name_username');
const statusProfileInput = popupElement.querySelector('.popup__form-input_name_status');
const openProfileButton = document.querySelector('.profile');
const popupProfileEditButtonElement = openProfileButton.querySelector('.profile__edit-button');
const popupProfileEditButtonContainer = document.querySelector('.popup__edit-container');
const profileNewName = document.querySelector('.profile__title');
const profileNewStatus = document.querySelector('.profile__subtitle');

//Константы для функции добавления картинок
const addPopupElement = document.querySelector('.popup__add-container');
const openAddImageButtonElement = document.querySelector('.profile__add-photo-button');
const popupAddImageButtonContainer = document.querySelector('.popup__add-container');
const addImageTitleInput = document.querySelector('.popup__add-form-input_name_title');
const addImageUrlInput = document.querySelector('.popup__add-form-input_name_url');

//Константы для полноразмерных картинок
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


//функция, которая открывает окошко
const openPopup = function (popupSelector) {
    popupElement.classList.add('popup_opened');
    console.log('Open popup clicked');
    popupSelector.classList.remove('popup__container_display')
}

//функция, которая закрывает окошко
const closePopup = function (parentContainer) {
    popupElement.classList.remove('popup_opened');
    popupElement.classList.remove('popup__fullsize');
    console.log('Close popup clicked');
    parentContainer.classList.add('popup__container_display');
}
for (let i = 0; i < popupCloseButtonElement.length; i++) {
    popupCloseButtonElement[i].addEventListener('click',
        function (event) {
            closePopup(event.target.parentElement)
        }
    );
}

// кнопка "Сохранить"
const handleEditFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileNewName.textContent = nameProfileInput.value;
    profileNewStatus.textContent = statusProfileInput.value;
    closePopup(event.target.parentElement);
}

// кнопка "Создать" для добавления новых картинок
const handleAddFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    addCard(addImageTitleInput.value, addImageUrlInput.value);
    closePopup(event.target.parentElement);
    addImageTitleInput.value = '';
    addImageUrlInput.value = '';
}

//Удаление картинки по нажатию на корзину
const handleImageDelete = function (event) {
    event.target.parentElement.remove();
    console.log('delete clicked');
}

//Открываем полноразмерную картинку
const handleImageFullsizeOpen = function (name, link) {
    imgFullSizeElement.src = link;
    imgFullSizeElement.alt = name;
    titleFullSizeElement.textContent = name;
    popupElement.classList.add('popup__fullsize');
    openPopup(fullSizeContainer);
}

//Добавление структуры для первых 6 картинок
function addCard(name, link) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('element');
    const trashButton = document.createElement('button');
    trashButton.classList.add('element__trash-button');
    trashButton.type = 'button';

    //Удаляем картинку по нажатию на корзину
    trashButton.addEventListener('click', handleImageDelete);

//делаем кнопку, в которую будет помещено фото
    const imgButton = document.createElement('button');
    imgButton.classList.add('element__img-button');
    imgButton.type = 'button';

    //добавляем действие по клику на картинку
    imgButton.addEventListener("click", function () {
        handleImageFullsizeOpen(name, link);
    })

    const imgElement = document.createElement('img');
    imgElement.classList.add('element__photo');
    imgElement.src = link;
    imgElement.alt = name;
    const divElement = document.createElement('div');
    divElement.classList.add('element__title');
    const h2Element = document.createElement('h2');
    h2Element.classList.add('element__name');
    h2Element.textContent = name;
    const likeButton = document.createElement('button');
    likeButton.classList.add('element__like-button');
    likeButton.type = 'button';

    //Нажатие на сердечко
    likeButton.addEventListener('click', function (event) {
            event.target.classList.toggle('elements__like-button_active');
            console.log('Like clicked');
        }
    )

//Добавляем структуру в DOM
    const elementsSection = document.querySelector('.elements');
    articleElement.append(trashButton);
    articleElement.append(imgButton);
    imgButton.append(imgElement);
    articleElement.append(divElement);
    divElement.append(h2Element);
    divElement.append(likeButton);
    elementsSection.prepend(articleElement);
}


//Функция добавления первых 6 элементов
for (let i = 0; i <= 5; i = i + 1) {
    addCard(initialCards[i].name, initialCards[i].link);
}

//обработчик события
popupProfileEditButtonElement.addEventListener('click', function () {
    nameProfileInput.value = profileNewName.textContent;
    statusProfileInput.value = profileNewStatus.textContent;
    openPopup(popupProfileEditButtonContainer)
});

openAddImageButtonElement.addEventListener('click', function () {
    openPopup(addPopupElement)
});


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupProfileEditButtonContainer.addEventListener('submit', handleEditFormSubmit);
popupAddImageButtonContainer.addEventListener('submit', handleAddFormSubmit);




