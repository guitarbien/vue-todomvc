const STORAGE_KEY = 'vue-todomvc';

module.export = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }
};
