export default class Popup {
  constructor(
    root,
    header,
    preloader,
    popupAuthorization,
    popupRegistration,
    popupSuccessfulRegistration,
    closeNav,
    mainApi,
    formAuthorizationValidity,
    formRegistrationValidity,
    main,
  ) {
    this.root = root;
    this.headerMenu = header.querySelector('.header__menu');
    this.headerNav = header.querySelector('.header__nav');
    this.headerNavItems = header.querySelector('.header__nav-items');
    this.headerNavItem = header.querySelectorAll('.header__nav-item');
    this.headerNavMain = header.querySelectorAll('.header__nav-main');
    this.headerNavButton = header.querySelector('.header__nav-button');
    this.preloaderResult = preloader.querySelector('.preloader__result');
    this.popupAuthorization = popupAuthorization;
    this.popupRegistration = popupRegistration;
    this.popupSuccessfulRegistration = popupSuccessfulRegistration;
    this.popupLinkAuthorization = popupAuthorization.querySelector('.popup__link');
    this.popupLinkRegistration = popupRegistration.querySelector('.popup__link');
    this.popupLinkSuccessfulRegistration = popupSuccessfulRegistration.querySelector('.popup__link');
    this.formAuhorization = popupAuthorization.querySelector('.popup__form-authorization');
    this.formRegistration = popupRegistration.querySelector('.popup__form-registration');
    this.errorResponseAuthorization = popupAuthorization.querySelector('.error__response');
    this.errorResponseRegistration = popupRegistration.querySelector('.error__response');
    this.closeNav = closeNav;
    this.mainApi = mainApi;
    this.formAuthorizationValidity = formAuthorizationValidity;
    this.formRegistrationValidity = formRegistrationValidity;
    this.main = main;
  }

  openPopupAuthorization = () => {
    this.closeNav();
    this.root.classList.add('root_dark');
    this.popupAuthorization.classList.add('popup_display');
    this.popupRegistration.classList.remove('popup_display');
    this.popupSuccessfulRegistration.classList.remove('popup_display');
    this.formAuthorizationValidity._checkInputsForms();
    this.formAuthorizationValidity._errorReset();
    this.formAuhorization.reset();
  }

  openPopupRegistration = () => {
    this.popupAuthorization.classList.remove('popup_display');
    this.popupRegistration.classList.add('popup_display');
    this.formRegistrationValidity._checkInputsForms();
    this.formRegistrationValidity._errorReset();
    this.formRegistration.reset();
  }

  registration = (event) => {
    event.preventDefault();
    this.mainApi.signup()
      .then((res) => {
        if (res.ok) {
          this.root.classList.add('root_dark');
          this.popupRegistration.classList.remove('popup_display');
          this.popupSuccessfulRegistration.classList.add('popup_display');
          return true;
        }
        return res.text().then((json) => Promise.reject(json));
      })
      .catch((e) => {
        if (e.length > 50) {
          this.errorResponseRegistration.textContent = `Ошибка: ${JSON.parse(e).validation.body.message}`;
        } else if (e === 'Email is busy') {
          this.errorResponseRegistration.textContent = `Ошибка: ${e}`;
        } else {
          this.errorResponseRegistration.textContent = 'Ошибка на сервере';
        }
      });
  }

  authorization = (event) => {
    event.preventDefault();
    const btn = event.submitter;
    btn.textContent = 'Загрузка...';
    this.preloaderResult.classList.remove('preloader_display');
    this.mainApi.signin()
      .then((res) => {
        if (res.ok) {
          return this.mainApi.getUserData()
            .then((resUser) => {
              if (resUser.ok) {
                return resUser.json().then((json) => {
                  localStorage.setItem('nameUser', `${json.users.name}`);
                  window.location.href = '../articles';
                });
              }
              return Promise.reject(resUser.status);
            })
            .catch((e) => {
              btn.textContent = 'Войти';
              this.errorResponseAuthorization.textContent = `Ошибка на сервере: ${e}`;
            });
        }
        btn.textContent = 'Войти';
        return res.text().then((json) => Promise.reject(json));
      })
      .catch((e) => {
        btn.textContent = 'Войти';
        if (e.length > 50) {
          this.errorResponseAuthorization.textContent = `Ошибка: ${JSON.parse(e).validation.body.message}`;
        } else if (e === 'Incorrect email or password') {
          this.errorResponseAuthorization.textContent = `Ошибка: ${e}`;
        } else {
          this.errorResponseAuthorization.textContent = 'Ошибка на сервере';
        }
      });
  }

  _closePopup = (popup, close) => {
    const popupClose = (event) => {
      if (event.target.classList[0] === 'popup' || event.target.className === 'popup__close') {
        this.formAuhorization.reset();
        this.root.classList.remove('root_dark');
        this.headerMenu.classList.remove('header__menu_close');
        popup.classList.remove('popup_display');
      }
    };
    popup.addEventListener('click', popupClose);
    close.addEventListener('click', popupClose);
  }

  addEventListener = () => {
    if (this.main === 'main') this.headerNavButton.addEventListener('click', this.openPopupAuthorization.bind(this));
    this.popupLinkAuthorization.addEventListener('click', this.openPopupRegistration.bind(this));
    this.popupLinkSuccessfulRegistration.addEventListener('click', this.openPopupAuthorization.bind(this));
    this.popupLinkRegistration.addEventListener('click', this.openPopupAuthorization.bind(this));
    this.formRegistration.addEventListener('submit', this.registration.bind(this));
    this.formAuhorization.addEventListener('submit', this.authorization.bind(this));
  }
}
