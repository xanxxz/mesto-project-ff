

const openPopup = document.querySelector('popup_is-opened');
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

    popups.forEach(popup => {
        closeModal(popup);
    });
  };
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  const popup = document.querySelector('.popup');
  const inputName = document.querySelector('.popup__input_type_name');
  const inputDescription = document.querySelector('.popup__input_type_description');
  const newName = inputName.value;
  const newDescription = inputDescription.value;

  const userName = document.querySelector('.profile__title');
  const userDescription = document.querySelector('.profile__description');

  userName.textContent = newName;
  userDescription.textContent = newDescription;

  closeModal(popup);
}

export {openModal, closeModal, escClose, handleFormSubmit};