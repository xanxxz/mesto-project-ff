import '../pages/index.css';
import {createCard, removeCard, toggleLike} from '../components/card.js';
import {openModal, closeModal, initOverlayClose} from '../components/modal.js';
import {enableValidation, clearValidation} from '../components/validation.js';
import {postCards, fetchData, patchProfileInfo, deleteCards, likeCard, unlikeCard, patchProfileAvatar} from '../components/api.js';

let userId = null;

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const changeButton = document.querySelector('.profile__image')
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmButton = confirmPopup.querySelector('.popup__button');
const changeAvatar = document.querySelector('.popup_type_change-avatar');
const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

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

const submitButton = document.querySelector(validationConfig.submitButtonSelector);

enableValidation(validationConfig);

newCardForm.addEventListener('submit', saveNewCard);

editFormElement.addEventListener('submit', handleEditFormSubmit);

newAvatarForm.addEventListener('submit', saveNewAvatar);

editButton.addEventListener('click', () => {
  const inputList = Array.from(editPopup.querySelectorAll(validationConfig.inputSelector));
  const isFormValid = inputList.every(input => input.validity.valid);

  clearValidation(editPopup, validationConfig);

  if (isFormValid) {
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
    submitButton.disabled = false;
  }

  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(addPopup, validationConfig)
  openModal(addPopup)
});

changeButton.addEventListener('click', () => {
  newAvatarForm.reset();
  clearValidation(changeAvatar, validationConfig);
  openModal(changeAvatar)
})

function openConfirmPopup() {
  openModal(confirmPopup);
};

function closeConfirmPopup() {
  closeModal(confirmPopup)
};

initCloseButtonsListeners();

initOverlayClose(popups);

function saveNewCard(evt) {
  evt.preventDefault();
  
  const addButton = newCardForm.querySelector('.popup__button');
  const placeName = newCardForm['place-name'].value;
  const placeLink = newCardForm['link'].value;
  
  addButton.textContent = 'Сохранение...';
  
  postCards(placeName, placeLink)
    .then(res => {
      loadNewCard(res);
      newCardForm.reset();
      closeModal(addPopup);
    })
    .catch(err => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      addButton.textContent = 'Сохранить';
  });
};

function loadNewCard(cardData) {
  const cardElement = createCard(cardData, userId, removeCard, toggleLike, openPopup, likeCard, unlikeCard, deleteConfirm);
  placesList.prepend(cardElement);
};

function renderCards(cardData) {
  cardData.forEach(cardData => {
    const cardElement = createCard(cardData, userId, removeCard, toggleLike, openPopup, likeCard, unlikeCard, deleteConfirm);
    placesList.appendChild(cardElement);
  });
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  const editButton = editPopup.querySelector('.popup__button');
  const newName = inputName.value;
  const newDescription = inputDescription.value;

  editButton.textContent = 'Сохранение...';

  patchProfileInfo(newName, newDescription)
  .then(() => {
    userName.textContent = newName;
    userDescription.textContent = newDescription;
    closeModal(editPopup);
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`);
  })
  .finally(() => {
    editButton.textContent = 'Сохранить';
  });
};

function saveNewAvatar(evt) {
  evt.preventDefault();

  const changeButton = newAvatarForm.querySelector('.popup__button')
  const avatarLink = newAvatarForm['link'].value;
  const avatar = document.querySelector('.profile__image');

  changeButton.textContent = 'Сохранение...';

  patchProfileAvatar(avatarLink)
  .then(() => {
    avatar.style = `background-image: url('${avatarLink}')`
    newAvatarForm.reset();
    closeModal(changeAvatar);
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`);
  })
  .finally(() => {
    changeButton.textContent = 'Сохранить';
  });
};

function initCloseButtonsListeners() {
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
  
      closeModal(popup);
    });
  });
};

function openPopup(imageSrc, imageCaption, imageName) {
  image.src = imageSrc;
  caption.textContent = imageCaption;
  image.alt = imageName;
  openModal(imagePopup);
};

function deleteConfirm(cardData, cardElement) {
  openConfirmPopup()

  confirmButton.onclick = () => {
    deleteCards(cardData._id)
      .then(() => {
        cardElement.remove();
        closeConfirmPopup();
      })
      .catch(err => {
        console.error(`Ошибка при удалении карточки: ${err.status}`);
        closeConfirmPopup();
      });
  };
};


const updateProfile = (userData) => {
  const userAvatar = document.querySelector('.profile__image');

  inputName.value = userData.name;
  inputDescription.value = userData.about;
  userName.textContent = userData.name;
  userDescription.textContent = userData.about;
  userAvatar.style = `background-image: url('${userData.avatar}')`;
};

fetchData()
  .then(([userData, cardData]) => {
    userId = userData._id;
    updateProfile(userData);
    renderCards(cardData);
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
    return Promise.reject(`Ошибка: ${err.status}`);
  });