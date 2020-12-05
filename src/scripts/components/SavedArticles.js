export default class SavedArticles {
  constructor(
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
  ) {
    this.header = header;
    this.headerLogo = header.querySelector('.header__logo');
    this.headerMenu = header.querySelector('.header__menu');
    this.headerNavItem = header.querySelectorAll('.header__nav-item');
    this.headerNavMain = header.querySelectorAll('.header__nav-main');
    this.headerNavButton = header.querySelector('.header__nav-button');
    this.info = info;
    this.infoTitle = info.querySelector('.info__title');
    this.infoContainerCards = info.querySelector('.info__container-cards');
    this.infoContainerConservedCards = info.querySelector('.info__container-conserved-cards');
    this.infoButton = info.querySelector('.info__button');
    this.search = search;
    this.author = author;
    this.description = description;
    this.descriptionTitle = description.querySelector('.description__title');
    this.descriptionSubtitleBold = description.querySelector('.description__subtitle-bold');
    this.preloaderResult = preloader.querySelector('.preloader__result');
    this.preloaderError = preloader.querySelector('.preloader__error');
    this.footerItem = footer.querySelectorAll('.footer__item');
    this.closeNav = closeNav;
    this.mainApi = mainApi;
    this.createCardFunction = createCardFunction;
    this.sortingKeywords = sortingKeywords;
  }

  entranceSavedArticles = () => {
    this.closeNav();
    this.header.classList.add('header_boxShadow');
    this.headerLogo.classList.add('header__logo_color');
    this.headerMenu.classList.add('header__menu_dark');
    this.headerNavItem[1].classList.add('header__nav-item_active');
    this.headerNavMain[0].classList.add('header__nav-main_color');
    this.headerNavMain[0].classList.add('header__nav-item_borderBottom-none');
    this.headerNavMain[1].classList.remove('header__nav_drop-down-nav-main');
    this.headerNavMain[1].classList.add('header__nav-main_color');
    this.headerNavButton.classList.add('header__nav-button_color');
    this.headerNavButton.classList.remove('header__nav-button-icon');
    this.headerNavButton.classList.add('header__nav-button-icon_dark');
    this.info.classList.add('info_display');
    this.infoTitle.classList.add('info_display-none');
    this.infoContainerCards.classList.add('info_display-none');
    this.infoButton.classList.add('info_display-none');
    this.search.classList.add('search_display-none');
    this.author.classList.add('author_display-none');
    this.description.classList.add('description_display');
    this.preloaderResult.classList.remove('preloader_display');
    this.preloaderError.classList.remove('preloader_display');
    this.infoContainerConservedCards.textContent = '';
    this.mainApi.getArticles()
      .then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            this.descriptionTitle.textContent = `${localStorage.getItem('nameUser')}, у вас ${json.articles.length} сохраненных статей`;
            const arrKey = this.sortingKeywords(json.articles);
            if (arrKey.length <= 3) {
              let descriptionKeyword = '';
              arrKey.forEach((i) => {
                descriptionKeyword += `${i}, `;
              });
              this.descriptionSubtitleBold.textContent = descriptionKeyword.slice(0, -2);
            } else {
              this.descriptionSubtitleBold.textContent = `${arrKey[0]}, ${arrKey[1]} и ${arrKey.length - 2} другим`;
            }
            json.articles.forEach((i) => {
              this.infoContainerConservedCards.appendChild(this.createCardFunction().savedCard(i));
            });
          }).catch((e) => console.log(e));
        }
        return Promise.reject(res.status);
      }).catch((e) => {
        this.descriptionTitle.textContent = `Ошибка на сервере: ${e}`;
      });
  }

  exitOnTheMain = () => {
    this.closeNav();
    this.header.classList.remove('header_boxShadow');
    this.headerLogo.classList.remove('header__logo_color');
    this.headerMenu.classList.remove('header__menu_dark');
    this.headerNavMain[0].classList.remove('header__nav-main_color');
    this.headerNavMain[0].classList.remove('header__nav-item_borderBottom-none');
    this.headerNavMain[1].classList.remove('header__nav_drop-down-nav-main');
    this.headerNavMain[1].classList.remove('header__nav-main_color');
    this.headerNavButton.classList.add('header__nav-button-icon');
    this.headerNavButton.classList.remove('header__nav-button_color');
    this.headerNavButton.classList.remove('header__nav-button-icon_dark');
    this.info.classList.remove('info_display');
    this.infoTitle.classList.remove('info_display-none');
    this.infoButton.classList.remove('info_display-none');
    this.infoContainerCards.classList.remove('info_display-none');
    this.infoContainerConservedCards.textContent = '';
    this.search.classList.remove('search_display-none');
    this.author.classList.remove('author_display-none');
    this.description.classList.remove('description_display');
  }

  addEventListener = () => {
    this.headerNavMain[1].addEventListener('click', this.entranceSavedArticles.bind(this));
    this.headerNavItem[0].addEventListener('click', this.exitOnTheMain.bind(this));
    this.headerLogo.addEventListener('click', this.exitOnTheMain.bind(this));
    this.footerItem[0].addEventListener('click', this.exitOnTheMain.bind(this));
  }
}
