import { browser, protractor, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { TodoPage } from './todo-list.po';

describe('Todo list', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
        page.navigateTo();
    });
    it('Should have the correct title', () => {
        expect(page.getTodoTitle()).toEqual('Todos');
    });


    describe('Filtering', () => {
        it('should test the owner filter', () => {
            page.typeInput('todo-owner-input', 'Blanche');
            expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
            page.getTodoOwnerCells().each(e => {
                expect(e.getText()).toEqual('Blanche');
            });
        });

        it('should test the category filter', () => {
            page.typeInput('todo-category-input', 'homework');
            expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
            page.getTodoCategoryCells().each(e => {
                expect(e.getText()).toEqual('homework');
            });
        });
        it('Should type something partial in the category filter and check that it returned correct elements', () => {
            page.typeInput('todo-category-input', 'de');
            expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
            page.getTodoCategoryCells().each(e => {
                expect(e.getText()).toMatch(/de/i);
            });
        });
        it('Should type something partial in the owner filter and check that it returned correct elements', () => {
            page.typeInput('todo-owner-input', 'ry');
            expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
            page.getTodoOwnerCells().each(e => {
                expect(e.getText()).toMatch(/ry/i);
            });
        });
        it('Should return the correct elements for multiple filters', () => {
            page.typeInput('todo-body-input', 'Lorem');
            page.typeInput('todo-owner-input', 'Workman');
            expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
            page.getTodoBodyCells().each(e => {
                expect(e.getText()).toMatch(/Lorem/i);
            });
            page.getTodoOwnerCells().each(e => {
                expect(e.getText()).toMatch(/Workman/i);
            });
        });
        describe('The status selecter: ', () => {
            it('Should select a status check that it returned correct elements', () => {
                page.selectMatSelectValue('todo-status-select', 'complete');
                expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
                page.getTodoStatusCells().each(e => {
                    expect(e.getText()).toMatch('Complete');
                });
            });
            it('Should make sure that status works with the other fields', () => {
                page.selectMatSelectValue('todo-status-select', 'complete');
                page.typeInput('todo-body-input', 'Lorem');
                page.typeInput('todo-owner-input', 'Workman');
                expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
                page.getTodoStatusCells().each(e => {
                    expect(e.getText()).toMatch('Complete');
                });
                page.getTodoBodyCells().each(e => {
                    expect(e.getText()).toMatch(/Lorem/i);
                });
                page.getTodoOwnerCells().each(e => {
                    expect(e.getText()).toMatch(/Workman/i);
                });
            });
        });
    });
});
