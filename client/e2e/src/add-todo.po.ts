
import {browser, by, element} from 'protractor';

export class AddTodoPage {

  navigateTo() {
    return browser.get('/todos/new');
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


  selectInput(selectID: string, value: string) {
    const sel = element(by.id(selectID));
    return sel.click().then(() => {
      return element(by.css('mat-option[value="' + value + '"]')).click();
    });
  }
}
