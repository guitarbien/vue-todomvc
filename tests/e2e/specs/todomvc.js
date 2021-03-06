// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '應顯示程式標題與輸入欄位': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.header')
      .assert.containsText('h1', 'todos')
      .assert.elementPresent('.new-todo')
      .end()
  },
  '輸入欄位應該在輸入待辦事項後清空' (browser) {
    const todo = 'This is new todo';

    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .setValue('.new-todo', [todo, browser.Keys.ENTER])
      .assert.value('.new-todo', '')
      .end();
  },
  '建立新待辦事項後應該出現待辦事項列表' (browser) {
    const todo = 'This is new todo';

    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .setValue('.new-todo', [todo, browser.Keys.ENTER])
      .waitForElementVisible('.todo-list > .todo:first-child', 1000)
      .assert.containsText('.todo-list > .todo:first-child > .view > label', todo)
      .end();
  },
  '當沒有待辦事項時列表應該隱藏' (browser) {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.hidden('.main', 1000)
      .end();
  },
  '當完成待辦事項後應標記為已完成' (browser) {
    const todo = 'This is new todo';

    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .setValue('.new-todo', [todo, browser.Keys.ENTER])
      .waitForElementVisible('.todo-list', 1000)
      .click('.todo-list > .todo:first-child > .view > .toggle')
      .assert.cssClassPresent('.todo-list > .todo:first-child', 'completed')
      .end();
  },
  '應可從列表上刪除待辦事項' (browser) {
    const todo = 'This is new todo';

    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .setValue('.new-todo', [todo, browser.Keys.ENTER])
      .waitForElementVisible('.todo-list', 1000)
      .moveToElement('.todo-list > .todo:first-child', 10, 10)
      .click('.todo-list > .todo:first-child > .view > button.destroy')
      .assert.elementCount('.todo', 0)
      .end();
  }
};
