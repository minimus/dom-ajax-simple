/**
 * Created by Константин on 10.04.2017.
 */
class DataManager {
  constructor() {
    this.api = 'd1702297d6d44aed92f84e13cd0a0122';
  }

  async getData(src, ...args) {
    const out = [];
    let url, [source, order] = [...args];

    if (src === 'nav') {
      url = new URL('https://newsapi.org/v1/sources');
      url.searchParams.append('language', 'en');
    }
    else if (src === 'news') {
      url = new URL('https://newsapi.org/v1/articles');
      url.searchParams.append('source', source);
      url.searchParams.append('sortBy', order);
      url.searchParams.append('apiKey', this.api);
    }
    else return Promise.reject(Error('Bad query'));

    try {
      const res = await fetch(url);
      return res.json();
    }
    catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  getNavData() {
    return this.getData('nav');
  }

  getNewsData(source, order) {
    return this.getData('news', source, order);
  }
}
