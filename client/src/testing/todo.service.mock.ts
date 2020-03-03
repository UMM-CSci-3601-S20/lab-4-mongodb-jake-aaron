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
  static testTodos: Todo[] = [
    {
        _id: 'warren_id',
        owner: 'Warren',
        category: 'Visual Art Pioneering',
        status: true,
        body: 'one by one by one',
    },
    {
        _id: 'deb_id',
        owner: 'Deb',
        category: 'Grad Studenting',
        status: true,
        // tslint:disable-next-line: quotemark
        body: "It's not there. It's not there.",
    },
    {
        _id: 'claire_id',
        owner: 'Claire',
        category: 'Unhappy Relationshipping',
        status: false,
        // tslint:disable-next-line: quotemark
        body: "I'm trying.",
    },
  ];

  public todoArray: Todo[];

  constructor() {
    super(null);
  }

  getTodos(filters?: {
    category?: string,
    status?: boolean,
    body?: string,
    owner?: string }): Observable<Todo[]> {
    return of(testTodos);
  }

  addTodo(newTodo: Todo): Observable<string> {
    this.todoArray.push(newTodo);
    return of('Sure, that\'s totally stored in the database now!');
  }
}
