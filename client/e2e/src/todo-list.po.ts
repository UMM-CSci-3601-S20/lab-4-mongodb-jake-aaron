import { browser, by, element, ElementFinder, Key } from 'protractor';

export class TodoPage {
    navigateTo() {
        return browser.get('/todos');
    }

    getUrl() {
        return browser.getCurrentUrl();
    }

    getTodoTitle() {
        const title = element(by.className('todo-list-title')).getText();
        return title;
    }

    backSpace() {
        browser.actions().sendKeys(Key.BACK_SPACE).perform();
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
    getTodoList() {
        return element(by.className('todo-nav-list')).all(by.tagName('todo-list-item'));
    }
    getTodoTableRows() {
        return element(by.tagName('tbody')).all(by.tagName('tr'));
    }

    getTodoOwnerCells() {
        return element.all(by.className('todo-owner-cell'));
    }

    getTodoCategoryCells() {
        return element.all(by.className('todo-category-cell'));
    }

    getTodoStatusCells() {
        return element.all(by.className('todo-status-cell'));
    }

    getTodoBodyCells() {
        return element.all(by.className('todo-body-cell'))
    }
    clickHeaderCell(headerCellID: string) {
        const headerCell = element(by.id(headerCellID));
        headerCell.click();
    }
}
