import '../pages/index.css';
import {createCard, removeCard, toggleLike} from '../components/card.js';
import {initialCards} from './cards.js';
import {openModal, closeModal, initOverlayClose} from '../components/modal.js';
import {enableValidation, clearValidation} from '../components/validation.js';

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(validationConfig);

renderCards(initialCards);

newCardForm.addEventListener('submit', saveNewCard);

editFormElement.addEventListener('submit', handleEditFormSubmit); 

editButton.addEventListener('click', () => {
  inputName.value = userName;
  inputDescription.value = userDescription;

  clearValidation(editPopup, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  clearValidation(addPopup, validationConfig);
  openModal(addPopup)
});

initCloseButtonsListeners();

initOverlayClose(popups);

function renderCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, removeCard, toggleLike, openPopup);

    placesList.appendChild(cardElement);
  });
};

function saveNewCard(evt) {
  evt.preventDefault();

  const newCardForm = document.forms['new-place'];
  const popup = document.querySelector('.popup_type_new-card');
  const placeName = newCardForm['place-name'].value;
  const placeLink = newCardForm['link'].value;

  const cardData = {
    name: placeName,
    link: placeLink
  };

  const cardElement = createCard(cardData, removeCard, toggleLike, openPopup);
  placesList.prepend(cardElement);

  newCardForm.reset();
  closeModal(popup)
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const editPopup = document.querySelector('.popup_type_edit');
  const inputName = document.querySelector('.popup__input_type_name');
  const inputDescription = document.querySelector('.popup__input_type_description');
  const newName = inputName.value;
  const newDescription = inputDescription.value;

  const userName = document.querySelector('.profile__title');
  const userDescription = document.querySelector('.profile__description');

  userName.textContent = newName;
  userDescription.textContent = newDescription;

  closeModal(editPopup);
};

function initCloseButtonsListeners() {
  const closeButtons = document.querySelectorAll('.popup__close');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
  
      closeModal(popup);
    });
  });
};

export function openPopup(imageSrc, imageCaption) {
  const imagePopup = document.querySelector('.popup_type_image');
  const image = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__caption');

  image.src = imageSrc;
  caption.textContent = imageCaption;

  openModal(imagePopup);
};