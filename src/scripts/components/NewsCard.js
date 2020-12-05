export default class NewsCard {
  constructor(info, description, mainApi, createCardFunction, date, sortingKeywords, site) {
    this.infoContainerConservedCards = info.querySelector('.info__container-conserved-cards');
    this.descriptionTitle = description.querySelector('.description__title');
    this.descriptionSubtitleBold = description.querySelector('.description__subtitle-bold');
    this.mainApi = mainApi;
    this.createCardFunction = createCardFunction;
    this.date = date;
    this.sortingKeywords = sortingKeywords;
    this.site = site;
    // this.cardDelete = this.cardDelete.bind(this);
  }

  markupCard = (cardData) => {
    const card = document.createElement('div');
    const cardButtonCollection = document.createElement('button');
    const cardLinkContainer = document.createElement('a');
    const cardImageContainer = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardDate = document.createElement('h4');
    const cardTitle = document.createElement('h3');
    const cardContainerText = document.createElement('div');
    const cardText = document.createElement('p');
    const cardLinkText = document.createElement('p');

    card.classList.add('card');
    cardButtonCollection.classList.add('card__button-collection');
    cardLinkContainer.classList.add('card__link-container');
    cardImageContainer.classList.add('card__image-container');
    cardImage.classList.add('card__image');
    cardDate.classList.add('card__date');
    cardTitle.classList.add('card__title');
    cardContainerText.classList.add('card__container-text');
    cardText.classList.add('card__text');
    cardLinkText.classList.add('card__link-text');

    card.appendChild(cardButtonCollection);
    card.appendChild(cardLinkContainer);
    cardLinkContainer.appendChild(cardImageContainer);
    cardImageContainer.appendChild(cardImage);
    cardLinkContainer.appendChild(cardDate);
    cardLinkContainer.appendChild(cardTitle);
    cardLinkContainer.appendChild(cardContainerText);
    cardContainerText.appendChild(cardText);
    cardLinkContainer.appendChild(cardLinkText);

    cardDate.textContent = this.date(cardData.publishedAt);
    cardTitle.textContent = cardData.title;
    cardText.textContent = cardData.description;
    cardLinkText.textContent = cardData.source.name;
    cardLinkContainer.href = cardData.url;
    cardImage.src = `${cardData.urlToImage}`;

    cardLinkContainer.setAttribute('target', '_blank');

    if (this.site === 'main') {
      const cardTextHint = document.createElement('p');
      cardTextHint.classList.add('card__text-hint');
      card.appendChild(cardTextHint);
      cardTextHint.textContent = 'Войдите, чтоб сохранять статьи';
      this.cardTextHint = cardTextHint;
      cardButtonCollection.addEventListener('click', this.buttonCollectionHint.bind(this));
    }
    if (this.site === 'article') {
      cardButtonCollection.addEventListener('click', this.buttonCollectionActive.bind(this));
    }
    this.cardData = cardData;

    return card;
  }

  savedCard = (cardData) => {
    const card = document.createElement('div');
    const cardButtonDelete = document.createElement('button');
    const cardTextTitle = document.createElement('p');
    const cardLinkContainer = document.createElement('a');
    const cardImageContainer = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardDate = document.createElement('h4');
    const cardTitle = document.createElement('h3');
    const cardContainerText = document.createElement('div');
    const cardText = document.createElement('p');
    const cardLinkText = document.createElement('p');

    card.classList.add('card');
    cardButtonDelete.classList.add('card__button-delete');
    cardTextTitle.classList.add('card__text-title');
    cardLinkContainer.classList.add('card__link-container');
    cardImageContainer.classList.add('card__image-container');
    cardImage.classList.add('card__image');
    cardDate.classList.add('card__date');
    cardTitle.classList.add('card__title');
    cardContainerText.classList.add('card__container-text');
    cardText.classList.add('card__text');
    cardLinkText.classList.add('card__link-text');

    card.appendChild(cardButtonDelete);
    card.appendChild(cardTextTitle);
    card.appendChild(cardLinkContainer);
    cardLinkContainer.appendChild(cardImageContainer);
    cardImageContainer.appendChild(cardImage);
    cardLinkContainer.appendChild(cardDate);
    cardLinkContainer.appendChild(cardTitle);
    cardLinkContainer.appendChild(cardContainerText);
    cardContainerText.appendChild(cardText);
    cardLinkContainer.appendChild(cardLinkText);

    cardTextTitle.textContent = cardData.keyword;
    cardDate.textContent = this.date(cardData.date);
    cardTitle.textContent = cardData.title;
    cardText.textContent = cardData.text;
    cardLinkText.textContent = cardData.source;
    cardLinkContainer.href = cardData.link;
    cardImage.src = `${cardData.image}`;

    this.card = card;
    this.cardData = cardData;
    this.cardButtonDelete = cardButtonDelete;

    cardLinkContainer.setAttribute('target', '_blank');
    cardButtonDelete.addEventListener('click', this.cardDelete);

    return card;
  }

  buttonCollectionHint = (event) => {
    if (event.target.className === 'card__button-collection') {
      this.cardTextHint.classList.add('card__text-hint_display');
      const textHint = () => this.cardTextHint.classList.remove('card__text-hint_display');
      setTimeout(textHint, 1000);
    }
  }

  buttonCollectionActive = (event) => {
    event.stopPropagation();
    const obj = {
      keyword: localStorage.getItem('keyword'),
      title: this.cardData.title,
      text: this.cardData.description,
      date: this.cardData.publishedAt,
      source: this.cardData.source.name,
      link: this.cardData.url,
      image: this.cardData.urlToImage,
    };
    if (event.target.className === 'card__button-collection') {
      this.mainApi.createArticle(obj).then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            this.jsonId = json.id;
            event.target.classList.add('card__button-collection_active');
            event.target.classList.remove('card__button-collection');
          }).catch((e) => console.log(e));
        }
        return res.text().then((json) => Promise.reject(json));
      }).catch((e) => console.log(e));
    } else if (event.target.className === 'card__button-collection_active') {
      this.mainApi.removeArticle(this.jsonId).then((res) => {
        if (res.ok) {
          event.target.classList.remove('card__button-collection_active');
          event.target.classList.add('card__button-collection');
          return true;
        }
        return res.text().then((json) => Promise.reject(json));
      }).catch((e) => console.log(e));
    }
  }

  cardDelete = (event) => {
    if (event.target.className === 'card__button-delete') {
      this.mainApi.removeArticle(this.cardData._id)
        .then((res) => {
          if (res.ok) {
            this.cardButtonDelete.removeEventListener('click', this.cardDelete);
            this.card.remove();
            this.mainApi.getArticles().then((resArticles) => {
              if (resArticles.ok) {
                return resArticles.json().then((json) => {
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
                }).catch((e) => console.log(e));
              }
              return res.text().then((json) => Promise.reject(json));
            }).catch((e) => console.log(e));
          }
          return res.text().then((json) => Promise.reject(json));
        }).catch((e) => console.log(e));
    }
  }
}
