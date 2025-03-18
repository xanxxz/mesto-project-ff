import '../pages/index.css';
import {renderCards, saveNewCard} from '../components/card.js';
import {initialCards} from './cards.js';
import {openModal, handleEditFormSubmit, overlayClose, buttonClose} from '../components/modal.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

const userName = document.querySelector('.profile__title').textContent;
const userDescription = document.querySelector('.profile__description').textContent;
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const newCardForm = document.forms['new-place'];
const editFormElement = document.querySelector('.popup__form');

renderCards(initialCards);

newCardForm.addEventListener('submit', saveNewCard);

editButton.addEventListener('click', () => {
  inputName.value = userName;
  inputDescription.value = userDescription;

  openModal(editPopup);
});

addButton.addEventListener('click', () => openModal(addPopup));

buttonClose();

overlayClose();

editFormElement.addEventListener('submit', handleEditFormSubmit); 

export function openPopup(imageSrc, imageCaption) {
  const imagePopup = document.querySelector('.popup_type_image');
  const image = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__caption');

  image.src = imageSrc;
  caption.textContent = imageCaption;

  openModal(imagePopup);
};