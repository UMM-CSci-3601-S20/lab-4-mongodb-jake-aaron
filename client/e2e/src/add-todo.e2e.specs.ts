import {browser, protractor, by, element, /*utils*/} from 'protractor';
import { AddTodoPage } from './add-todo.po';
import { E2EUtil } from './e2e.util';

describe('Add todo', () => {
  let page: AddTodoPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AddTodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTitle()).toEqual('New Todo');
  });


  it('Should enable and disable the add user button', async () => {
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('ownerField', 'test');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(false);
    await page.typeInput('status', 'Incomplete');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(false);
    await page.typeInput('body', 'invalid');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(false);
    await page.typeInput('category', 'video games');
    expect(element(by.buttonText('ADD USER')).isEnabled()).toBe(true);
  });

});
