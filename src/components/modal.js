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

function initOverlayClose(popups) {
  popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      };
    });
  });
};

export {openModal, closeModal, initOverlayClose};