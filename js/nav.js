/**
 * Created by Константин on 10.04.2017.
 */
class Navigation {
  constructor(dm, news) {
    this.dm = dm;
    this.news = news;
    this.newsHolder = document.querySelector('#news-data');
    this.catHolder = document.querySelector('nav');
    this.srcHolder = document.querySelector('#sidebar');
    this.orderHolder = document.querySelector('#order');
    this._staticData = [];
    this.currentCategory = '';
    this.currentSource = '';
    this.currentOrder = '';
    this.attempts = 5;
  }

  get staticData() {
    return this._staticData;
  }

  set staticData(data) {
    this._staticData = data;
    this.currentCategory = data[0].category;
    this.currentSource = data[0].sources[0].id;
    this.currentOrder = data[0].sources[0].sortBysAvailable[0];
    this.initNavigationControls();
  }

  init() {
    this.prepareNavData();
  }

  prepareNavData() {
    this.dm.getNavData()
      .then(data => {
        const out = [];
        if (data.status === 'ok') {
          const cats = [];
          for (const ns of data.sources) {
            cats.push(ns.category);
          }
          for (const val of [...cats.reduce((a, c) => {
            if (-1 === a.indexOf(c)) a.push(c);
            return a;
          }, [])]) {
            out.push({category: val, sources: [...data.sources.filter(c => (c.category === val))]});
          }
        }
        else if (data.status === 'error')
          throw new Error(data.message);
        else
          throw new Error('Oops! Something went wrong...');
        this.staticData = out;
      })
      .catch(e => {
        let again = '';
        if (this.attempts > 1) {
          again = 'Trying to fetch data again. Next attempt will be done after 10 sec.';
        }
        else if (this.attempts === 0) {
          again = "Sorry! Can't resolve this problem...";
        }
        this.newsHolder.innerHTML = renderWarning(['Sorry! The error has occurred on the News Server...', e, again]);
        if (this.attempts > 0) setTimeout(() => {
          this.attempts--;
          this.prepareNavData();
        }, 10000);
      });
  }

  initNavigationControls() {
    this.renderCategories(this.staticData);
  }

  renderCategories(data) {
    let out = '';
    for (const val of data) {
      let selected = (val.category === this.currentCategory) ? "class='selected'" : '';
      out += `<li id='${val.category}' ${selected}>${val.category.replace(/-/g, ' ')}</li>`;
    }
    this.catHolder.innerHTML = `<ul>${out}</ul>`;
    this.setNavEventListeners(data);
  }

  renderSources(category = this.currentCategory, data = this.staticData) {
    const sources = data.find(e => e.category === category).sources;
    let out = '';
    this.currentSource = sources[0].id;
    for (const val of sources) {
      let selected = (val.id === this.currentSource) ? 'class="selected"' : '';
      out += `<li id="${val.id}" ${selected} title="${val.description}"><span><img src="${val.urlsToLogos.small}"></span><p>${val.name}</p></li>`;
    }
    this.srcHolder.innerHTML = `<ul>${out}</ul>`;
    this.setSourcesEventListeners(sources);
  }

  renderSortOrder(source = this.currentSource, data = null) {
    if (!data) data = this.staticData.find(e => e.category === this.staticData[0].category).sources;
    const sorts = data.find(e => e.id === source).sortBysAvailable;
    let out = '<label for="sortOrder">Sort by</label><select id="sortOrder">';
    if (-1 === sorts.indexOf(this.currentOrder)) this.currentOrder = sorts[0];
    for (const val of sorts) {
      let selected = (val === this.currentOrder) ? 'selected' : '';
      out += `<option ${selected} value="${val}">${val}</option>`;
    }
    out += '</select>';
    this.orderHolder.innerHTML = out;
    this.setOrderEventListener();
  }

  setNavEventListeners(data) {
    const naviList = document.querySelectorAll('nav ul li');
    if (naviList.length) {
      for (const element of naviList) {
        element.addEventListener('click', () => {
          const prev = document.querySelector(`nav ul li#${this.currentCategory}`);
          prev.classList.remove('selected');
          this.currentCategory = element.id;
          element.classList.add('selected');
          this.renderSources(this.currentCategory, data);
        });
      }
    }
    this.renderSources();
  }

  setSourcesEventListeners(sources) {
    const srcList = document.querySelectorAll('#sidebar ul li');
    if (srcList.length) {
      for (const element of srcList) {
        element.addEventListener('click', () => {
          const prev = this.srcHolder.querySelector(`li#${this.currentSource}`);
          prev.classList.remove('selected');
          this.currentSource = element.id;
          element.classList.add('selected');
          this.renderSortOrder(element.id, sources);
        });
      }
    }
    this.renderSortOrder();
  }

  setOrderEventListener() {
    const sortOrder = this.orderHolder.querySelector('#sortOrder');
    sortOrder.addEventListener('change', () => {
      this.currentOrder = sortOrder.value;
      this.news.getNews(this.currentSource, this.currentOrder);
    });
    this.news.getNews(this.currentSource, this.currentOrder);
  }
}