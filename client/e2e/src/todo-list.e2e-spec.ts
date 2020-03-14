import {TodoPage} from './todo-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Todo list', () => {
  let page: TodoPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
  });


  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });


  it('Should type something in the owner filter and check that it returned correct elements', async () => {
    await page.typeInput('todo-owner-input', 'Barry');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-owner')).getText()).toEqual('Barry');
    });
  });


  it('Should type something in the category filter and check that it returned correct elements', async () => {
    await page.typeInput('todo-category-input', 'homework');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-category')).getText()).toEqual('homework');
    });
  });


  it('Should type something in the body filter and check that it returned correct elements', async () => {
    await page.typeInput('todo-body-input',
    'Consectetur quis cillum laborum sunt ea quis commodo reprehenderit reprehenderit voluptate irure. Est exercitation in enim laboris labore.'
    );

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-body')).getText()).toEqual(
        'Consectetur quis cillum laborum sunt ea quis commodo reprehenderit reprehenderit voluptate irure. Est exercitation in enim laboris labore.'
        );
    });
  });


  it('Should select a status and check that it returned correct elements', async () => {
    await page.selectMatSelectValue('todo-status-select', 'Complete');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-status-complete')).getText()).toEqual('Complete');
    });
  });



  it('Should click add todo and go to the right URL', async () => {
    await page.clickAddTodoFAB();

    await browser.wait(EC.urlContains('todos/new'), 10000);

    const url = await page.getUrl();
    expect(url.endsWith('/todos/new')).toBe(true);

    expect(element(by.className('add-todo-title')).getText()).toEqual('New Todo');
  });
});
