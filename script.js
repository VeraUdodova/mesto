// кнопка закрытия всплывающего окошка
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

// кнопка открытия всплывающего окошка
const openButton = document.querySelector('.profile');
const popupOpenButtonElement = openButton.querySelector('.profile__edit-button');

//функция, которая открывает и закрывает окошко
const togglePopupVisibility = function() {
popupElement.classList.toggle('popup__is-open')
}
//вызываем функцию
togglePopupVisibility();

//обработчик события
popupOpenButtonElement.addEventListener('click', function() {
    popupElement.classList.toggle('popup__is-open')
});


popupCloseButtonElement.addEventListener('click', function() {
    popupElement.classList.toggle('popup__is-open')
});