// Объявление переменных
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelectorAll('.popup__close');
const nameInput = popupElement.querySelector('.popup__form-input_name_username');
const statusInput = popupElement.querySelector('.popup__form-input_name_status');
const openButton = document.querySelector('.profile');
const popupOpenButtonElement = openButton.querySelector('.profile__edit-button');
const popupOpenButtonContainer = document.querySelector('.popup__edit-container');
const newName = document.querySelector('.profile__title');
const newStatus = document.querySelector('.profile__subtitle');
const addPopupElement = document.querySelector('.popup__add-container');
const openAddButtonElement = document.querySelector('.profile__add-photo-button');
const formProfileElement = document.querySelector('.form_profile');

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
    parentContainer.classList.add('popup__container_display')

}

for (let i = 0; i < popupCloseButtonElement.length; i++) {
    popupCloseButtonElement[i].addEventListener('click',
        function (event) {
            closePopup(event.target.parentElement)
        }
    );
}
// кнопка "Сохранить"
const handleFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    newName.textContent = nameInput.value;
    newStatus.textContent = statusInput.value;
    closePopup(event.target.parentElement)
}

// кнопка "Создать" для добавления новых картинок
const popupAddButton = document.querySelector('.popup__add-close');
const popupAddButtonContainer = document.querySelector('.popup__add-container');
const addTitleInput = document.querySelector('.popup__add-form-input_name_title');
const addUrlInput = document.querySelector('.popup__add-form-input_name_url');
const addImageTitle = document.querySelector('.popup__fullsize-pic-title');

const handleAddFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    addImageTitle.textContent = addTitleInput.value;
    addCard(addTitleInput.value, addUrlInput.value)
    closePopup(event.target.parentElement)
}
popupAddButtonContainer.addEventListener('submit', handleAddFormSubmit);


//Ставим "сердечко"
let heartElements = document.querySelectorAll('.element__like-button')
const heartElementEnabler = function (event) {
    event.target.classList.toggle('elements__like-button_active');
    console.log('Like clicked');
}
for (let i = 0; i < heartElements.length; i++) {
    heartElements[i].addEventListener('click', heartElementEnabler);
}


//Добавление структуры для первых 6 картинок
function addCard(name, link) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('element');
    const trashButton = document.createElement('button');
    trashButton.classList.add('element__trash-button');
    trashButton.type = 'button';

//делаем кнопку, в которую будет помещено фото
    const imgButton = document.createElement('button')
    imgButton.classList.add('element__img-button');
    imgButton.type = 'button';

    //добавляем действие по клику
    imgButton.addEventListener("click", function () {
            const fullSizeContainer = document.querySelector('.popup__fullsize-pic-container')
            const imgFullSizeElement = document.querySelector('.popup__fullsize-pic-image')
            imgFullSizeElement.src = link;
            imgFullSizeElement.alt = name;
            popupElement.classList.add('popup__fullsize')
            openPopup(fullSizeContainer)

        }
    )
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
//Добавляем структуру в DOM
    const elementsSection = document.querySelector('.elements');
    articleElement.append(trashButton)
    articleElement.append(imgButton)
    imgButton.append(imgElement)
    articleElement.append(divElement)
    divElement.append(h2Element)
    divElement.append(likeButton)
    elementsSection.prepend(articleElement);
}



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
//Функция добавления первых 6 элементов
for (let i = 0; i <= 5; i = i + 1) {
    addCard(initialCards[i].name, initialCards[i].link)
}


//Кнопка удаления картинок


//обработчик события
popupOpenButtonElement.addEventListener('click', function () {
    nameInput.value = newName.textContent;
    statusInput.value = newStatus.textContent;
    openPopup(popupOpenButtonContainer)
});

openAddButtonElement.addEventListener('click', function () {
    openPopup(addPopupElement)
});


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupOpenButtonContainer.addEventListener('submit', handleFormSubmit);





