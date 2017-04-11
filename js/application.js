/**
 * Created by Константин on 10.04.2017.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const match = window.navigator.userAgent.match(/(?:Chrome\/)(\d+)/);
    if (match && 57 <= parseInt(match[1], 10)) {
      const dm = new DataManager();
      const news = new News(dm);
      const nav = new Navigation(dm, news);
      nav.init();
    }
    else {
      const newsHolder = document.querySelector('#news-data');
      newsHolder.innerHTML = renderWarning([
        'This application is available <b>only for Google Chrome 57+</b>!',
        'Please, try again using valid browser!'
      ]);
    }
  });
})();