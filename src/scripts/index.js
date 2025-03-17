import '../pages/index.css';
import {renderCards, newCard, newCardForm} from './card.js';
import {initialCards} from './cards.js';
import {openModal, closeModal, escClose, handleFormSubmit} from './modal.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const userName = document.querySelector('.profile__title').textContent;
const userDescription = document.querySelector('.profile__description').textContent;
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const formElement = document.querySelector('.popup__form');

renderCards(initialCards);

newCardForm.addEventListener('submit', newCard);

editButton.addEventListener('click', () => openModal(editPopup));

addButton.addEventListener('click', () => openModal(addPopup));

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
      const popup = button.closest('.popup');

      closeModal(popup);
  });
});

window.addEventListener('click', (evt) => {
  popups.forEach(popup => {
      if (evt.target === popup) {
        closeModal(popup);
      };
  });
});

inputName.value = userName;
inputDescription.value = userDescription;

formElement.addEventListener('submit', handleFormSubmit); 

