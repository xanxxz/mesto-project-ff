function showInputError(input, errorMessage, settings) {
  const error = input.parentElement.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.classList.add(settings.errorClass);
  error.textContent = errorMessage;
};

function hideInputError(input, settings) {
  const error = input.parentElement.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.classList.remove(settings.errorClass);
  error.textContent = '';
};

function checkInputValidity(input, settings) {
  if (!input.validity.valid) {
    if (input.validity.patternMismatch) {
      showInputError(input, input.dataset.errorMessage, settings);
    } else {
      showInputError(input, input.validationMessage, settings);
    }
  } else {
    hideInputError(input, settings);
  }
};

function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputList.forEach((input) => {
      input.addEventListener('input', () => {
          checkInputValidity(input, settings);
          toggleButtonState(inputList, submitButton, settings);
      });
  });
};

function toggleButtonState(inputList, button, settings) {
  const isFormValid = inputList.every(input => input.validity.valid);
  if (isFormValid) {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  } else {
      button.classList.add(settings.inactiveButtonClass);
      button.disabled = true;
  }
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      setEventListeners(form, settings);
  });
};

function clearValidation(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputList.forEach((input) => {
      hideInputError(input, settings);
  });

  submitButton.classList.add(settings.inactiveButtonClass);
  submitButton.disabled = true;
};

export {enableValidation, clearValidation};