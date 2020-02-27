import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';


@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class TodoListComponent implements OnInit {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];
  public limitedTodos: Todo[];

  constructor(private todoService: TodoService) {

  }

  // These fields are hooked up to the inputs in the html.
  // They should be live: they'll automatically reflect changes to the contents
  // of the page.
  // We'll use them to filter the list of todos (either on the client or the
  // server)
  public todoOwner: string;
  public todoCategory: string;
  public todoBody: string;
  public todoStatus: 'complete' | 'incomplete';
  public todoLimit: string;

  limitTodos(): void {
    // As long as it isn't falsy
    // And it doesn't become falsy when parsed as a number.
    // Ex: ignore '', foo', 'NaN', '0'
    // but accept '1', '   20 ', '54030.12', etc.
    if (this.todoLimit && Number(this.todoLimit)) {
      this.limitedTodos =
        this.filteredTodos.slice(0, Number(this.todoLimit));
    } else {
      this.limitedTodos = this.filteredTodos;
    }
  }

  updateFilter(): void {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos,
      {
        owner: this.todoOwner,
        category: this.todoCategory,
        body: this.todoBody,
      },
    );

    this.limitTodos();
  }

  getTodosFromServer(): void {
    this.todoService.getTodos({
      status: this.todoStatus,
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }
}
