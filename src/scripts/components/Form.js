export default class Form {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    this.button = this.form.querySelector('button');
  }

  _checkInputValidity = (input, err) => {
    const error = err;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.errorMessages) {
      if (input.validity[key]) {
        error.textContent = this.errorMessages[key];
        return error;
      }
    }
    error.textContent = '';
    return error;
  }

  _setSubmitButtonState = () => {
    if (this.form.checkValidity()) {
      this._enabled();
    } else {
      this._disabled();
    }
  }

  setEventListeners = () => {
    this.form.addEventListener('input', (event) => {
      this._checkInputValidity(event.target, event.target.nextElementSibling);
      this._setSubmitButtonState();
    });
  }

  _checkInputsForms = () => {
    if (Array.from(this.form.querySelectorAll('input')).every((input) => input.value)) {
      this._enabled();
    } else {
      this._disabled();
    }
  }

  _errorReset = () => {
    this.form.querySelectorAll('span').forEach((i) => {
      const item = i;
      item.textContent = '';
    });
  }

  _disabled = () => {
    this.button.setAttribute('disabled', true);
    this.button.classList.add('button__disabled');
  }

  _enabled = () => {
    this.button.removeAttribute('disabled');
    this.button.classList.remove('button__disabled');
  }
}
