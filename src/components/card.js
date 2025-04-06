function createCard(cardData, deleteCards, removeCard, toggleLike, openPopup, openConfirmPopup, closeConfirmPopup, likeCard, unlikeCard) {
  const cardTemplate = document.getElementById('card-template');
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button'); 
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const confirmPopup = document.querySelector('.popup_type_confirm');
  const confirmButton = confirmPopup.querySelector('.popup__button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length

  deleteButton.addEventListener('click', () => {
    openConfirmPopup();
    confirmButton.onclick = () => {
      removeCard(cardElement);
      deleteCards(cardData._id)
      closeConfirmPopup();
    };
  });

  if (!(cardData.owner._id === '00ade4e33c5be2bca8a4b587')) {
    deleteButton.style.display = 'none';
  };

  likeButton.addEventListener('click', () => toggleLike(likeCounter, cardData, likeButton, likeCard, unlikeCard));
  cardImage.addEventListener('click', () => openPopup(cardData.link, cardData.name));

  return cardElement;
};

function removeCard(card) {
  card.remove();
};

function toggleLike(likeCounter, cardData, likeButton, likeCard, unlikeCard) {
  //likeButton.classList.toggle('card__like-button_is-active');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCard(cardData._id)
    likeButton.classList.remove('card__like-button_is-active');
    likeCounter.textContent = cardData.likes.length;
  } else {
    likeCard(cardData._id)
    likeButton.classList.add('card__like-button_is-active');
    likeCounter.textContent = cardData.likes.length;
  }
};

export {createCard, removeCard, toggleLike};