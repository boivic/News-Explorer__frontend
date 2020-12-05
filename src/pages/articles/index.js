import '../main/index.css';

import MainApi from '../../scripts/api/MainApi';
import NewsApi from '../../scripts/api/NewsApi';
import NewsCard from '../../scripts/components/NewsCard';
import NewsCardList from '../../scripts/components/NewsCardList';
import SavedArticles from '../../scripts/components/SavedArticles';
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
} from '../../scripts/constants/constants';


const domen = 'http://api.newsexplorer.students.nomoreparties.space';
const domenNews = 'http://nomoreparties.co/news/v2/everything?';

const author = root.querySelector('.author');
const footer = root.querySelector('.footer');

const mainApi = new MainApi(domen);
const newsApi = new NewsApi(domenNews);
const createCardFunction = () => new NewsCard(
  info,
  description,
  mainApi,
  createCardFunction,
  date,
  sortingKeywords,
  'article',
);
const newsCardList = new NewsCardList(info, search, preloader, newsApi, createCardFunction);
const savedArticles = new SavedArticles(
  header,
  info,
  search,
  author,
  description,
  preloader,
  footer,
  closeNav,
  mainApi,
  createCardFunction,
  sortingKeywords,
);
newsCardList.addEventListener();
savedArticles.addEventListener();

document.title = localStorage.getItem('nameUser');
header.querySelector('.header__nav-button').textContent = localStorage.getItem('nameUser');

header.querySelector('.header__menu').addEventListener('click', () => {
  const headerMenu = header.querySelector('.header__menu');
  const headerLogo = header.querySelector('.header__logo');
  const headerNavMain = header.querySelectorAll('.header__nav-main');
  if (['header__menu', 'header__menu header__menu_dark'].includes(headerMenu.className)) {
    openNav();
    header.classList.remove('header_boxShadow');
    headerLogo.classList.remove('header__logo_color');
    headerNavMain[1].classList.add('header__nav_drop-down-nav-main');
  } else {
    if (headerMenu.className === 'header__menu header__menu_dark header__menu_close') {
      header.classList.add('header_boxShadow');
      headerLogo.classList.add('header__logo_color');
    }
    closeNav();
    headerNavMain[1].classList.remove('header__nav_drop-down-nav-main');
  }
});
header.querySelector('.header__nav-button').addEventListener('click', () => {
  window.location.href = './';
});
