// Объявление переменных
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const nameInput = popupElement.querySelector('.popup__form-input_name_username');
const statusInput = popupElement.querySelector('.popup__form-input_name_status');
const openButton = document.querySelector('.profile');
const popupOpenButtonElement = openButton.querySelector('.profile__edit-button');
const newName = document.querySelector('.profile__title');
const newStatus = document.querySelector('.profile__subtitle');


//функция, которая открывает и закрывает окошко
const openPopup = function () {
    nameInput.value = newName.textContent;
    statusInput.value = newStatus.textContent;
    popupElement.classList.add('popup_opened');
    console.log('Open popup clicked');
}
const closePopup = function () {
    popupElement.classList.remove('popup_opened');
    console.log('Close popup clicked');
}

//Ставим "сердечко"
let heartElements = document.querySelectorAll('.element__like-button')
const heartElementEnabler = function (event) {
    event.target.classList.toggle('elements__like-button_active');
    console.log('Like clicked');
}
for (let i = 0; i < heartElements.length; i++) {
    heartElements[i].addEventListener('click', heartElementEnabler);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
const handleFormSubmit = function (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    newName.textContent = nameInput.value;
    newStatus.textContent = statusInput.value;
    closePopup()
}

//Добавление структуры для первых 6 картинок
function AddCard(name, link) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('element');
    const trashButton = document.createElement('button');
    trashButton.classList.add('element__trash-button');
    trashButton.type='button';
    const imgElement = document.createElement('img');
    imgElement.classList.add('element__photo');
    imgElement.src=link;
    imgElement.alt=name;
    const divElement = document.createElement('div');
    divElement.classList.add('element__title');
    const h2Element = document.createElement('h2');
    h2Element.classList.add('element__name');
    h2Element.textContent=name;
    const likeButton = document.createElement('button');
    likeButton.classList.add('element__like-button');
    likeButton.type='button';
//Добавляем структуру в DOM
    const elementsSection = document.querySelector('.elements');
    articleElement.append(trashButton)
    articleElement.append(imgElement)
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
for (let i = 0; i<=5; i=i+1) {
    AddCard (initialCards[i].name, initialCards[i].link)
}


//Кнопка удаления картинок


//обработчик события
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupElement.addEventListener('submit', handleFormSubmit);
