import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Todo } from './todo';
import { TodoService } from './todo.service';

/*
* Hey Nic and KK (and whoever else may look at this)
* At this point I am aware that there are some elements of this project that are not 100% functional
* But i've been working on this for a week and and a half and am still not done with much more to work on for
* this class and others, etc. and I can't let this project take up any more time or space in my head.
* I will most likely return to this project to finish it as I would like to see it through, I just mentally
* am incapable of doing so right now. So. Yeah. Thanks. -Aaron
*/

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
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
            {type: 'min', message: 'Owner must be at least 2 characters long'},
            {type: 'max', message: 'Owner cannot be more than 50 characters long'},
            {type: 'pattern', message: 'Owner must contain only lettters and numbers'}
        ],

        body: [
            {type: 'required', message: 'Body is required'},
            {type: 'min', message: 'Body must be at least 2 characters long'},
            {type: 'max', message: 'Body cannot be more than 200 characters long'},
        ],

        category: [
            {type: 'required', message: 'Category is required'},
            {type: 'min', message: 'Category must be at least 2 characters long'},
            {type: 'max', message: 'Category cannot be more than 15 characters long'},
        ],

        status: [
            {type: 'required', message: 'Status is required'},
            {type: 'pattern', message: 'Status must be Complete or Incomplete'},
        ]
    };

    createForms() {
        this.addTodoForm = this.fb.group({
            owner: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(2),
                Validators.max(50),
                Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s+$(\\.0-9+)?')
            ])),

            body: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(1),
                Validators.max(200)
            ])),

            category: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(1),
                Validators.max(15)
            ])),

            status: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^(Incomplete|Complete)$')
            ])),
        });
    }

    ngOnInit() {
        this.createForms();
    }

    submitForm() {
        this.todoService.addTodo(this.addTodoForm.value).subscribe(newID => {
            this.snackBar.open('Added Todo ' + this.addTodoForm.value.owner, null, {
                duration: 2000,
            });
            this.router.navigate(['/todos/', newID]);
        }, err => {
            this.snackBar.open('Failed to add the Todo', null, {
                duration: 2000,
            });
        });
    }
}
