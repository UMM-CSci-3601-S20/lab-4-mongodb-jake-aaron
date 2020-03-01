import {browser, by, element, Key, ElementFinder} from 'protractor';

export interface TestTodo {
  owner: string;
  status: boolean;
  body: string;
  category: 'software design'|'video games'|'groceries'|'homework';
}

export class AddTodoPage {
  navigateTo() {
    return browser.get('/todos/new');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    const title = element(by.className('add-todo-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  selectMatSelectValue(selectID: string, value: string) {
    const sel = element(by.id(selectID));
    return sel.click().then(() => {
      return element(by.css('mat-option[value="' + value + '"]')).click();
    });
  }

  clickAddTodo() {
    return element(by.buttonText('ADD USER')).click();
  }

  async addTodo(newTodo: TestTodo) {
    await this.typeInput('owner', newTodo.owner);
    await this.typeInput('body', newTodo.body);
    await this.typeInput('category', newTodo.category);

    return this.clickAddTodo();
  }
}
