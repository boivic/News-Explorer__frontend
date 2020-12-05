import {
  root,
  header,
} from '../constants/constants';

const headerMenu = header.querySelector('.header__menu');
const headerNav = header.querySelector('.header__nav');
const headerNavItems = headerNav.querySelector('.header__nav-items');
const headerNavItem = headerNavItems.querySelectorAll('.header__nav-item');
const headerNavMain = headerNavItems.querySelectorAll('.header__nav-main');
const headerNavButton = headerNavItems.querySelector('.header__nav-button');

const openNav = () => {
  root.classList.add('root_dark');
  header.classList.add('header_dark');
  headerMenu.classList.add('header__menu_close');
  headerNav.classList.add('header__nav_drop-down-nav');
  headerNavItems.classList.add('header__nav_drop-down-nav-items');
  headerNavItem[2].classList.add('header__nav_drop-down-nav-item');
  headerNavMain[0].classList.add('header__nav_drop-down-nav-main');
  headerNavButton.classList.add('header__nav_drop-down-nav-button');
};
const closeNav = () => {
  root.classList.remove('root_dark');
  header.classList.remove('header_dark');
  headerMenu.classList.remove('header__menu_close');
  headerNav.classList.remove('header__nav_drop-down-nav');
  headerNavItems.classList.remove('header__nav_drop-down-nav-items');
  headerNavItem[2].classList.remove('header__nav_drop-down-nav-item');
  headerNavMain[0].classList.remove('header__nav_drop-down-nav-main');
  headerNavButton.classList.remove('header__nav_drop-down-nav-button');
};

const date = (str) => {
  const arrMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const arrDate = new Date(str).toLocaleString('ru', options).split('.');
  const dateNew = `${arrDate[0]} ${arrMonths[arrDate[1] / 1]}, ${arrDate[2]}`;
  return dateNew;
};

const sortingKeywords = (articles) => {
  const arrKeyword = articles.map((i) => i.keyword).sort();
  const obj = {};
  let v = 0;
  for (let i = 0; i < arrKeyword.length; i += 1) {
    if (arrKeyword[i] !== arrKeyword[i + 1]) {
      obj[arrKeyword[i]] = v + 1;
      v = 0;
    } else {
      v += 1;
    }
  }
  const arrKey = Object.entries(obj).sort((a, b) => b[1] - a[1]).map((n) => n[0]);
  return arrKey;
};

export {
  openNav,
  closeNav,
  date,
  sortingKeywords,
};
