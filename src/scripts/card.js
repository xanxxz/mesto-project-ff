import {openModal, closeModal} from './modal.js';

const cardTemplate = document.getElementById('card-template');
const placesList = document.querySelector('.places__list');
const newCardForm = document.forms['new-place'];

function createCard(cardData, removeCard, toggleLike, openPopup) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button'); 
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    deleteButton.addEventListener('click', () => removeCard(cardElement));

    likeButton.addEventListener('click', () => toggleLike(likeButton));

    cardImage.addEventListener('click', () => openPopup(cardData.link, cardData.name));

    return cardElement;

  };

  function openPopup(imageSrc, imageCaption) {
    const imagePopup = document.querySelector('.popup_type_image');
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');

    image.src = imageSrc;
    caption.textContent = imageCaption;
    imagePopup.classList.add('popup-is-opened');

    openModal(imagePopup);
  };

  function renderCards(cards) {
    cards.forEach(cardData => {
      const cardElement = createCard(cardData, removeCard, toggleLike, openPopup);
  
      placesList.appendChild(cardElement);
    });
  };
  
  function removeCard(card) {
    card.remove();
  };

function newCard(evt) {
  evt.preventDefault();

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

function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

export {renderCards, newCard, newCardForm};