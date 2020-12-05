export default class NewsCardList {
  constructor(
    info,
    search,
    preloader,
    newsApi,
    createCardFunction,
  ) {
    this.info = info;
    this.infoContainerCards = info.querySelector('.info__container-cards');
    this.infoButton = info.querySelector('.info__button');
    this.preloaderSearch = preloader.querySelector('.preloader__search');
    this.preloaderResult = preloader.querySelector('.preloader__result');
    this.preloaderError = preloader.querySelector('.preloader__error');
    this.searchForm = search.querySelector('.search__form');
    this.newsApi = newsApi;
    this.createCardFunction = createCardFunction;
  }

  searchNews = (event) => {
    event.preventDefault();
    if (this.searchForm.querySelector('input').checkValidity()) {
      this.info.classList.remove('info_display');
      this.infoContainerCards.textContent = '';
      localStorage.setItem('keyword', `${this.searchForm.search.value.toLowerCase()}`);
      this.preloaderSearch.classList.add('preloader_display');
      this.preloaderResult.classList.remove('preloader_display');
      this.preloaderError.classList.remove('preloader_display');
      this.newsApi.getNews()
        .then((res) => {
          if (res.ok) {
            return res.json().then((json) => {
              for (let i = 0; i < 3; i += 1) {
                // eslint-disable-next-line max-len
                this.infoContainerCards.appendChild(this.createCardFunction().markupCard(json.articles[i]));
              }
              this.preloaderSearch.classList.remove('preloader_display');
              this.info.classList.add('info_display');
            }).catch(() => {
              this.preloaderSearch.classList.remove('preloader_display');
              this.preloaderResult.classList.add('preloader_display');
            });
          }
          this.preloaderSearch.classList.remove('preloader_display');
          this.preloaderResult.classList.add('preloader_display');
          return true;
        }).catch(() => {
          this.preloaderSearch.classList.remove('preloader_display');
          this.preloaderError.classList.add('preloader_display');
        });
    } else {
      this.searchForm.querySelector('.error').textContent = 'нужно ввести ключевое слово';
      const search = () => {
        this.searchForm.querySelector('.error').textContent = '';
      };
      setTimeout(search, 2000);
    }
    this.searchForm.reset();
  }

  addListNews = () => {
    const containerLength = this.infoContainerCards.children.length;
    this.infoButton.textContent = 'Поиск...';
    if (containerLength < 100) {
      this.newsApi.getNews().then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            for (let i = containerLength; i < containerLength + 3; i += 1) {
              // eslint-disable-next-line max-len
              this.infoContainerCards.appendChild(this.createCardFunction().markupCard(json.articles[i]));
              this.infoButton.textContent = 'Показать еще';
            }
          }).catch((e) => {
            this.infoButton.textContent = 'Ошибка';
            console.log(e);
          });
        }
        return Promise.reject();
      }).catch((e) => {
        this.infoButton.textContent = 'Ошибка';
        console.log(e);
      });
    } else {
      this.infoButton.classList.add('info_display-none');
    }
  }

  addEventListener = () => {
    this.searchForm.addEventListener('submit', this.searchNews.bind(this));
    this.infoButton.addEventListener('click', this.addListNews.bind(this));
  }
}
