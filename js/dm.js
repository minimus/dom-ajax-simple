/**
 * Created by Константин on 10.04.2017.
 */
class DataManager {
  /**
   * Creates data manager
   */
  constructor() {
    this.api = 'd1702297d6d44aed92f84e13cd0a0122';
  }

  /**
   * Fetching data from News Server
   * @param {string} src - data selector
   * @param args - {string} source and {string} order for fetching news data
   * @returns {Promise.<*>}
   */
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
      return Promise.reject(e);
    }
  }

  /**
   * Function-wrapper for fetching navigation static data
   * @returns {Promise.<*>}
   */
  getNavData() {
    return this.getData('nav');
  }

  /**
   * Function-wrapper for fetching news data
   * @param source
   * @param order
   * @returns {Promise.<*>}
   */
  getNewsData(source, order) {
    return this.getData('news', source, order);
  }
}
