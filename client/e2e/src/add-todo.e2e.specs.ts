import {browser, protractor, by, element, utils} from 'protractor';
import { AddTodoPage, TestTodo } from './add-todo.po';
import { E2EUtil } from './e2e.util';

describe('Add todo', () => {
  let page: AddTodoPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AddTodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTitle()).toEqual('New User');
  });


  it('Should enable and disable the add user button', async () => {
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('ownerField', 'test');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(false);
    await page.typeInput('status', 'false');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(false);
    await page.typeInput('body', 'invalid');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(false);
    await page.typeInput('category', 'video games');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(true);
  });

  it('Should add a new todo and go to the right page', async () => {
    const todo: TestTodo = {
      owner: E2EUtil.randomText(10),
      category: 'video games',
      status: false,
      body: E2EUtil.randomText(5) + 'tester testy test',
    };

    await page.addTodo(todo);

    // Wait until the URL does not contain 'users/new'
    await browser.wait(EC.not(EC.urlContains('todo/new')), 10000);

    const url = await page.getUrl();
    expect(RegExp('.*\/todo\/[0-9a-fA-F]{24}$', 'i').test(url)).toBe(true);
    expect(url.endsWith('/todo/new')).toBe(false);

    expect(element(by.className('todo-card-owner')).getText()).toEqual(todo.owner);
    expect(element(by.className('todo-card-status')).getText()).toEqual(todo.status);
    expect(element(by.className('todo-card-category')).getText()).toEqual(todo.category);
    expect(element(by.className('todo-card-body')).getText()).toEqual(todo.body);
  });

});
