export default class NewsApi {
  constructor(domenNews) {
    this.domenNews = domenNews;
  }

  getNews = () => fetch(`${this.domenNews}${new URLSearchParams({
    q: localStorage.getItem('keyword'),
    from: `${new Date().getFullYear()}-${new Date().getFullYear()}-${new Date().getDate() - 7}`,
    to: `${new Date().getFullYear()}-${new Date().getFullYear()}-${new Date().getDate()}`,
    sortBy: 'popularity',
    pageSize: 100,
    apiKey: '5e2afeefed444d3c9b47f03ab9b71d98',
  })}`)
}
