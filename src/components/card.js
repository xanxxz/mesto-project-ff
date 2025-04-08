function createCard(cardData, userId, removeCard, toggleLike, openPopup, likeCard, unlikeCard, deleteConfirm) {
  const cardTemplate = document.getElementById('card-template');
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button'); 
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length

  if (!(cardData.owner._id === userId)) {
    deleteButton.style.display = 'none';
  };

  deleteButton.addEventListener('click', () => removeCard(cardData, deleteConfirm, cardElement));
  likeButton.addEventListener('click', () => toggleLike(likeCounter, cardData, likeButton, likeCard, unlikeCard));
  cardImage.addEventListener('click', () => openPopup(cardData.link, cardData.name, cardData.name));

  return cardElement;
};

function removeCard(cardData, deleteConfirm, cardElement) {
  deleteConfirm(cardData, cardElement);
};

function toggleLike(likeCounter, cardData, likeButton, likeCard, unlikeCard) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCard(cardData._id)
      .then(() => {
        likeButton.classList.remove('card__like-button_is-active');
        unlikeCard(cardData._id)
        .then(res => {
          likeCounter.textContent = res.likes.length;
        })
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  } else {
    likeCard(cardData._id)
      .then(() => {
        likeButton.classList.add('card__like-button_is-active');
        likeCard(cardData._id)
        .then(res => {
          likeCounter.textContent = res.likes.length;
        })
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }
};

export {createCard, removeCard, toggleLike};