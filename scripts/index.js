const cardTemplate = document.getElementById('card-template');
const placesList = document.querySelector('.places__list');

function createCard(cardData, removeCard) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    removeCard(cardElement);
  });

  return cardElement;
}

function renderCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, removeCard);

    placesList.appendChild(cardElement);
  });
}

function removeCard(card) {
  card.remove();
}

renderCards(initialCards);