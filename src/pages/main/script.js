import './index.css';

import MainApi from '../../scripts/api/MainApi';
import NewsApi from '../../scripts/api/NewsApi';
import NewsCard from '../../scripts/components/NewsCard';
import NewsCardList from '../../scripts/components/NewsCardList';
import Form from '../../scripts/components/Form';
import Popup from '../../scripts/components/Popup';
import {
  openNav,
  closeNav,
  date,
  sortingKeywords,
} from '../../scripts/utils/utils';
import {
  root,
  header,
  search,
  preloader,
  description,
  info,
  errorMessages,
} from '../../scripts/constants/constants';

const domen = 'http://api.newsexplorer.students.nomoreparties.space';
const domenNews = 'http://nomoreparties.co/news/v2/everything?';

const popupAuthorization = root.querySelector('.popup__authorization');
const popupRegistration = root.querySelector('.popup__registration');
const popupSuccessfulRegistration = root.querySelector('.popup__successful-registration');
const popupAuthorizationClose = popupAuthorization.querySelector('.popup__close');
const popupRegistrationClose = popupRegistration.querySelector('.popup__close');
const popupSuccessfulRegistrationClose = popupSuccessfulRegistration.querySelector('.popup__close');

const formAuhorization = popupAuthorization.querySelector('.popup__form-authorization');
const formRegistration = popupRegistration.querySelector('.popup__form-registration');


const mainApi = new MainApi(domen, formAuhorization, formRegistration);
const newsApi = new NewsApi(domenNews);
const createCardFunction = () => new NewsCard(
  info,
  description,
  mainApi,
  createCardFunction,
  date,
  sortingKeywords,
  'main',
);
const newsCardList = new NewsCardList(info, search, preloader, newsApi, createCardFunction);
const formAuthorizationValidity = new Form(formAuhorization, errorMessages);
const formRegistrationValidity = new Form(formRegistration, errorMessages);
const popup = new Popup(
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
  'main',
);
newsCardList.addEventListener();
formAuthorizationValidity.setEventListeners();
formRegistrationValidity.setEventListeners();
popup.addEventListener();
popup._closePopup(popupAuthorization, popupAuthorizationClose);
popup._closePopup(popupRegistration, popupRegistrationClose);
popup._closePopup(popupSuccessfulRegistration, popupSuccessfulRegistrationClose);


header.querySelector('.header__menu').addEventListener('click', () => {
  const headerMenu = header.querySelector('.header__menu');
  if (['header__menu', 'header__menu header__menu_dark'].includes(headerMenu.className)) {
    openNav();
    if (root.querySelector('.popup_display')) root.querySelector('.popup_display').classList.remove('popup_display');
  } else {
    closeNav();
  }
});
function exitOnTheMain() {
  closeNav();
  if (root.querySelector('.popup_display')) root.querySelector('.popup_display').classList.remove('popup_display');
}
header.querySelectorAll('.header__nav-item')[0].addEventListener('click', exitOnTheMain);
header.querySelector('.header__logo').addEventListener('click', exitOnTheMain);
