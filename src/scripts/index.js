import '../pages/index.css';
import {createCard, removeCard, toggleLike} from '../components/card.js';
import {openModal, closeModal, initOverlayClose} from '../components/modal.js';
import {enableValidation, clearValidation} from '../components/validation.js';
import {postCards, fetchUser, fetchCards, patchProfileInfo, deleteCards, likeCard, unlikeCard, patchProfileAvatar} from '../components/api.js';

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const changeButton = document.querySelector('.profile__image')
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const confirmPopup = document.querySelector('.popup_type_confirm');
const changeAvatar = document.querySelector('.popup_type_change-avatar');

const newCardForm = document.forms['new-place'];
const editFormElement = document.querySelector('.popup__form');
const newAvatarForm = document.forms['new-avatar'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(validationConfig);

newCardForm.addEventListener('submit', saveNewCard);

editFormElement.addEventListener('submit', handleEditFormSubmit);

newAvatarForm.addEventListener('submit', saveNewAvatar);

editButton.addEventListener('click', () => {
  clearValidation(editPopup, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  clearValidation(addPopup, validationConfig);
  openModal(addPopup)
});

changeButton.addEventListener('click', () => {
  clearValidation(changeAvatar, validationConfig);
  openModal(changeAvatar)
})

export function openConfirmPopup() {
  openModal(confirmPopup);
};

export function closeConfirmPopup() {
  closeModal(confirmPopup)
};

initCloseButtonsListeners();

initOverlayClose(popups);

function saveNewCard(evt) {
  evt.preventDefault();

  const newCardForm = document.forms['new-place'];
  const addButton = newCardForm.querySelector('.popup__button');
  const popup = document.querySelector('.popup_type_new-card');
  const placeName = newCardForm['place-name'].value;
  const placeLink = newCardForm['link'].value;

  const cardData = {
    name: placeName,
    link: placeLink,
    likes: [],
    owner: {
      _id: '00ade4e33c5be2bca8a4b587'
    }
  };

  const cardElement = createCard(cardData, deleteCards, removeCard, toggleLike, openPopup, openConfirmPopup, closeConfirmPopup, likeCard, unlikeCard);

  addButton.textContent = 'Сохранение...';

  placesList.prepend(cardElement);
  postCards(placeName, placeLink, addButton);

  newCardForm.reset();
  closeModal(popup)
};

function renderCards(cardData) {
  cardData.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCards, removeCard, toggleLike, openPopup, openConfirmPopup, closeConfirmPopup, likeCard, unlikeCard);
    placesList.appendChild(cardElement);
  });
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  const editPopup = document.querySelector('.popup_type_edit');
  const editButton = editPopup.querySelector('.popup__button');
  const inputName = document.querySelector('.popup__input_type_name');
  const inputDescription = document.querySelector('.popup__input_type_description');
  const newName = inputName.value;
  const newDescription = inputDescription.value;

  editButton.textContent = 'Сохранение...';

  const userName = document.querySelector('.profile__title');
  const userDescription = document.querySelector('.profile__description');

  userName.textContent = newName;
  userDescription.textContent = newDescription;

  patchProfileInfo(newName, newDescription, editButton);
  closeModal(editPopup);
};

function saveNewAvatar(evt) {
  evt.preventDefault();

  const avatar = document.querySelector('.profile__image');
  const newAvatarForm = document.forms['new-avatar'];
  const changeButton = newAvatarForm.querySelector('.popup__button')
  const avatarLink = newAvatarForm['link'].value;


  avatar.style = `background-image: url('${avatarLink}')`
  changeButton.textContent = 'Сохранение...';

  patchProfileAvatar(avatarLink, changeButton);

  newAvatarForm.reset();

  closeModal(changeAvatar);
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

const updateProfile = (userData) => {
  const userName = document.querySelector('.profile__title');
  const userDescription = document.querySelector('.profile__description');
  const userAvatar = document.querySelector('.profile__image');
  const inputName = document.querySelector('.popup__input_type_name');
  const inputDescription = document.querySelector('.popup__input_type_description');

  inputName.value = userData.name;
  inputDescription.value = userData.about;
  userName.textContent = userData.name;
  userDescription.textContent = userData.about;
  userAvatar.style = `background-image: url('${userData.avatar}')`;
};

export const fetchData = () => { 
  Promise.all([fetchUser, fetchCards])
  .then(res => {
    if (res[0].ok || res[1].ok) {
      return Promise.all([res[0].json(), res[1].json()]);
  }})
  .then(data => {
    const userData = data[0];
    const cardData = data[1];

    updateProfile(userData);
    renderCards(cardData);
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`);
  })
};

fetchData()

