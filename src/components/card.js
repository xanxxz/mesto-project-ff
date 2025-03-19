function createCard(cardData, removeCard, toggleLike, openPopup) {
  const cardTemplate = document.getElementById('card-template');
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
  
function removeCard(card) {
  card.remove();
};

function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

export {createCard, removeCard, toggleLike};