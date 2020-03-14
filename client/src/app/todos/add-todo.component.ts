import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Todo } from './todo';
import { TodoService } from './todo.service';


@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: []
})
export class AddTodoComponent implements OnInit {
    addTodoForm: FormGroup;

    todo: Todo;

    constructor(private fb: FormBuilder, private todoService: TodoService, private snackBar: MatSnackBar, private router: Router) {
    }

    // tslint:disable-next-line: variable-name
    add_todo_validation_messages = {
        owner: [
            {type: 'required', message: 'Owner is required'},
            {type: 'minlength', message: 'Owner must be at least 2 characters long'},
            {type: 'maxlength', message: 'Owner cannot be more than 50 characters long'},
            {type: 'pattern', message: 'Owner must contain only letters'}
        ],

        body: [
            {type: 'required', message: 'Body is required'},
            {type: 'minlength', message: 'Body must be at least 2 characters long'},
            {type: 'maxlength', message: 'Body cannot be more than 200 characters long'}
        ],

        category: [
            {type: 'required', message: 'Category is required'},
            {type: 'minlength', message: 'Category must be at least 2 characters long'},
            {type: 'maxlength', message: 'Category cannot be more than 15 characters long'}
        ],

        status: [
            {type: 'required', message: 'Status is required'},
            {type: 'pattern', message: 'Status must be Complete or Incomplete'}
        ]
    };

    createForms() {
        this.addTodoForm = this.fb.group({
            owner: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern('^[A-Za-z\\s]+[A-Za-z\\s]*$')
            ])),

            body: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(200)
            ])),

            category: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(15)
            ])),

            status: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^(Complete|Incomplete)$')
            ])),
        });
    }

    ngOnInit() {
        this.createForms();
    }

    submitForm() {
      let statusBool;
      const formResults = this.addTodoForm.value;
      if ( this.addTodoForm.value.status === 'Complete') {
        statusBool = true;
      }
      if (this.addTodoForm.value.status === 'Incomplete') {
        statusBool = false;
      }
      this.addTodoForm.value.status = statusBool;
      this.todoService.addTodo(this.addTodoForm.value).subscribe(newID => {
            this.snackBar.open('Added Todo ' + this.addTodoForm.value.owner, null, {
                duration: 2000,
            });
            this.router.navigate(['/todos/']);
        }, err => {
            this.snackBar.open('Failed to add the Todo', null, {
                duration: 2000,
            });
        });
    }
}

/*
* Hey Nic and KK (and whoever else may look at this)
* At this point I am aware that there are some elements of this project that are not 100% functional
* But i've been working on this for a week and and a half and am still not done with much more to work on for
* this class and others, etc. and I can't let this project take up any more time or space in my head.
* I will most likely return to this project to finish it as I would like to see it through, I just mentally
* am incapable of doing so right now. So. Yeah. Thanks. -Aaron
*/
