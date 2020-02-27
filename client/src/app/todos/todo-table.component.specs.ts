import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableModule } from '@angular/material/table';
import { TodoTableComponent } from './todo-table.component';
import { testTodos } from '../../testing/test-todos';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
      ],
      declarations: [TodoTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    component.todos = testTodos;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display at least two columns', () => {
    expect(component.columnsToDisplay.length).toBeGreaterThanOrEqual(2);
  });

  describe('Todo sorting', () => {
    // Test sorting in ascending order.
    it('should sort by owner in ascending order', () => {
      component.currentSortingScheme = { active: 'owner', direction: 'asc' };
      expect(isSortedAsc(component.sortedData().map(todo => todo.owner))).toBeTruthy();
    });

    it('should sort by category in ascending order', () => {
      component.currentSortingScheme = { active: 'category', direction: 'asc' };
      expect(isSortedAsc(component.sortedData().map(todo => todo.category))).toBeTruthy();
    });

    it('should sort by status in ascending order', () => {
      component.currentSortingScheme = { active: 'status', direction: 'asc' };
      expect(isSortedAsc(component.sortedData().map(todo => todo.status))).toBeTruthy();
    });

    it('should sort by body in ascending order', () => {
      component.currentSortingScheme = { active: 'body', direction: 'asc' };
      expect(isSortedAsc(component.sortedData().map(todo => todo.body))).toBeTruthy();
    });
    // Test sorting in descending order.
    it('should sort by owner in descending order', () => {
      component.currentSortingScheme = { active: 'owner', direction: 'desc' };
      expect(isSortedDesc(component.sortedData().map(todo => todo.owner))).toBeTruthy();
    });

    it('should sort by category in descending order', () => {
      component.currentSortingScheme = { active: 'category', direction: 'desc' };
      expect(isSortedDesc(component.sortedData().map(todo => todo.category))).toBeTruthy();
    });

    it('should sort by status in descending order', () => {
      component.currentSortingScheme = { active: 'status', direction: 'desc' };
      expect(isSortedDesc(component.sortedData().map(todo => todo.status))).toBeTruthy();
    });

    it('should sort by body in descending order', () => {
      component.currentSortingScheme = { active: 'body', direction: 'desc' };
      expect(isSortedDesc(component.sortedData().map(todo => todo.body))).toBeTruthy();
    });

  });
});
function isSortedAsc(array) {
  const limit = array.length - 1;
  return array.every((_, i) => (i < limit ? array[i] <= array[i + 1] : true));
}
function isSortedDesc(array) {
  const limit = array.length - 1;
  return array.every((_, i) => (i < limit ? array[i] >= array[i + 1] : true));
}
