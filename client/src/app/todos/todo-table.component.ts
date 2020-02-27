import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Todo } from './todo';


@Component({
  selector: 'app-todo-table',
  templateUrl: 'todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
  providers: []
})

export class TodoTableComponent implements OnInit {

  @Input() todos: Todo[];
  @ViewChild('todoTable') todoTable;

  constructor() {
  }
  columnsToDisplay = [ 'owner', 'category', 'status', 'body' ];
  currentSortingScheme: Sort = { active: '', direction: '' };

  ngOnInit(): void {
  }


  sortedData(): Todo[] {
    const sort = this.currentSortingScheme;
    if (!sort.active || sort.direction === '') {
      return this.todos;
    }

    const sortedData = this.todos.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'owner': return compare(a.owner, b.owner, isAsc);
        case 'category': return compare(a.category, b.category, isAsc);
        case 'status' : return compare(Number(a.status), Number(b.status), isAsc);
        case 'body': return compare(a.body, b.body, isAsc);
        default: return 0;
      }
    });

    return sortedData;
  }

  sortData(sort: Sort): void {
    this.currentSortingScheme = sort;
    // We need to call sortedData once to 'flush' the new
    // sorting scheme.

    // If we don't call sortedData once ourselves, renderRows seems like
    // it will try to used a cached version of sortedData. (Or maybe it's
    // calling sortedData but refusing to repaint the screen? I don't
    // know what sort of voodoo renderRows is doing under the hood. All I
    // know is that we need to call the method to alert renderRows that
    // stuff has changed.)
    this.sortedData();
    this.todoTable.renderRows();
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
