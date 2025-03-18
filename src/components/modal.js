const popups = document.querySelectorAll('.popup');

function openModal(open) {
  open.classList.add('popup_is-animated');
  open.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClose);
};

function closeModal(close) {
  close.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClose);
};

function escClose(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  };
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
function buttonClose() {
  const closeButtons = document.querySelectorAll('.popup__close');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
  
      closeModal(popup);
    });
  });
}

function overlayClose() {
  popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      };
    });
  });
};

export {openModal, closeModal, escClose, handleEditFormSubmit, overlayClose, buttonClose};