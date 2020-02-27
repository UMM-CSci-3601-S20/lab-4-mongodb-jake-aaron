import { Injectable } from '@angular/core';
import { Observable, of, fromEventPattern } from 'rxjs';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';
import { testTodos } from './test-todos';

/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  constructor() {
    super(null);
  }

  getTodos(filters?: {
    category?: string,
    status?: string,
    body?: string,
    owner?: string }): Observable<Todo[]> {
    // Just return the test users regardless of what filters are passed in
    return of(testTodos);
  }
}
