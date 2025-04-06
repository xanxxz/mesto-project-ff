const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '10b18a7a-11ea-44b3-bf75-b49c36d385af',
    'Content-Type': 'application/json'
  }
};

export const fetchUser = 
  fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: apiConfig.headers
});

export const fetchCards = 
  fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
});

export const patchProfileInfo = (newName, newDescription, editButton) => {
  fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`);
  })
  .finally(() => {
    editButton.textContent = 'Сохранить';
  });
};

export const postCards = (cardName, cardLink, addButton) => {
  fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`);
  })
  .finally(() => {
    addButton.textContent = 'Сохранить';
  });
};

export const patchProfileAvatar = (avatarLink, changeButton) => {
  fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`);
  })
  .finally(() => {
    changeButton.textContent = 'Сохранить';
  });
};

export const deleteCards = (cardId) => {
  fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`)
  })
};

export const likeCard = (cardId) => {
  fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`)
  })
};

export const unlikeCard = (cardId) => {
  fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err.status}`)
  })
};