/**
 * Created by Константин on 11.04.2017.
 */
class News {
  /**
   * Creates news handler
   * @param {DataManager} dm - pointer to DataManager instance
   */
  constructor(dm) {
    this.dm = dm;
    this.newsHolder = document.querySelector('#news-data');
    this.attempts = 5;
  }

  /**
   * Outputting news data
   * @param {string} source - news source
   * @param {string} order  - sort order
   */
  getNews(source, order) {
    this.dm.getNewsData(source, order)
      .then(data => {
      if (data.status === 'ok') {
        this.renderNews(data);
        this.attempts = 5;
      }
      else if (data.status === 'error') {
        throw new Error(data.message);
      }
      else throw new Error('Oops! Something went wrong!');
    }).catch(e => {
      this.errorHandler(e, source, order);
    });
  }

  /**
   * Error handler. Generates error messages and trying to retry fetching data defined number of times.
   * @param {string} e      - reason
   * @param {string} source - news source
   * @param {string} order  - sort order
   */
  errorHandler(e, source, order) {
    let again = (this.attempts > 0) ?
      [
        'Trying to fetch data again. Next attempt will be done after 10 sec.',
        `Attempts left: ${this.attempts}`
      ] :
      ["Sorry! Can't resolve this problem... Try again later..."];
    this.newsHolder.innerHTML = renderWarning(['Sorry! The error has occurred on the News Server...', e, ...again]);
    if (this.attempts > 0) setTimeout(() => {
      this.attempts--;
      this.getNews(source, order);
    }, 10000);
  }

  /**
   * Outputs news
   * @param {object} data
   */
  renderNews(data) {
    let out = '';
    for (const article of data.articles) {
      out += this.renderNewsItem(article);
    }
    this.newsHolder.innerHTML = out;
  }

  /**
   * Generates news item tags
   * @param {object} itemData - item data from source
   * @returns {string}        - tags
   */
  renderNewsItem(itemData) {
    let
      out = '',
      imageURL = (itemData.urlToImage) ? itemData.urlToImage : 'images/no-image.png',
      publishDate = new Date(itemData.publishedAt).toLocaleDateString(),
      author = (itemData.author) ?
        ` <i class="material-icons news-author">face</i> <span class="art-info">${itemData.author}</span>` :
        '',
      description = shortenText(itemData.description, 50);

    out += '<div class="news-article">';
    out += '<div class="news-image">';
    out += `<a href="${itemData.url}"><img src="${imageURL}"></a>`;
    out += '</div>';
    out += '<div class="info">';
    out += `<a href="${itemData.url}"><h1>${itemData.title}</h1></a>`;
    out += '<p class="info-line">';
    out += `<i class="material-icons news-date">schedule</i> <span class="art-info">${publishDate}</span>`;
    out += author;
    out += "</p>";
    out += `<p>${description}</p>`;
    out += `<p><a href="${itemData.url}">Read More...</a></p>`;
    out += '</div>';
    out += '</div>';

    return out;
  }
}