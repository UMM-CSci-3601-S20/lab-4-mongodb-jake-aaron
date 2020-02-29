import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockTodoService } from 'src/testing/todo.service.mock';
import { AddTodoComponent } from './add-todo.component';
import { TodoService } from './todo.service';
import { AddUserComponent } from '../users/add-user.component';

describe('AddTodoComponent', () => {
    let addTodoComponent: AddTodoComponent;
    let addTodoForm: FormGroup;
    let calledClose: boolean;
    let fixture: ComponentFixture<AddTodoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatSnackBarModule,
                MatCardModule,
                MatFormFieldModule,
                MatSelectModule,
                MatInputModule,
                BrowserAnimationsModule,
                RouterTestingModule
              ],
            declarations: [AddTodoComponent],
            providers: [{ provide: TodoService, useValue: new MockTodoService() }]
        }).compileComponents().catch(error =>{
            expect(error).toBeNull();
        });
    }));

    beforeEach(() => {
        calledClose = false;
        fixture = TestBed.createComponent(AddTodoComponent);
        addTodoComponent = fixture.componentInstance;
        addTodoComponent.ngOnInit();
        fixture.detectChanges();
        addTodoForm = addTodoComponent.addTodoForm;
        expect(addTodoForm).toBeDefined();
        expect(addTodoForm.controls).toBeDefined();
    });

    it('should create the component and form', () => {
        expect(addTodoComponent).toBeTruthy();
        expect(addTodoForm).toBeTruthy();
    });

    it('form should be invalid when empty', () => {
        expect(addTodoForm.valid).toBeFalsy();
    });

    describe('The owner field', () => {
        let ownerControl: AbstractControl;

        beforeEach(() => {
            ownerControl = addTodoComponent.addTodoForm.controls['owner'];
        });

        it('should not allow empty owners', () => {
            ownerControl.setValue('');
            expect(ownerControl.valid).toBeFalsy();
        });

        it('should fail single character owners', () => {
            ownerControl.setValue('x');
            expect(ownerControl.valid).toBeFalsy();
            expect(ownerControl.hasError('min')).toBeTruthy();
        });

        it('should fail too large owners', () => {
            ownerControl.setValue('x'.repeat(60));
            expect(ownerControl.valid).toBeFalsy();
            expect(ownerControl.hasError('max')).toBeTruthy();
        });

        it('should fail special character owners', () => {
            ownerControl.setValue('*');
            expect(ownerControl.valid).toBeFalsy();
            expect(ownerControl.hasError('pattern')).toBeTruthy();
        });

        it('should allow numbers in owners', () => {
            ownerControl.setValue('123655');
            expect(ownerControl.valid).toBeTruthy();
        });
    });

    describe('The body field', () => {
        let bodyControl: AbstractControl;

        beforeEach(() => {
            bodyControl = addTodoComponent.addTodoForm.controls['body'];
        });

        it('should not allow empty bodys', () => {
            bodyControl.setValue('');
            expect(bodyControl.valid).toBeFalsy();
        });

        it('should fail single character bodys', () => {
            bodyControl.setValue('x');
            expect(bodyControl.valid).toBeFalsy();
            expect(bodyControl.hasError('min')).toBeTruthy();
        });

        it('should fail too large bodys', () => {
            bodyControl.setValue('x'.repeat(205));
            expect(bodyControl.valid).toBeFalsy();
            expect(bodyControl.hasError('max')).toBeTruthy();
        });

        it('should allow special character bodys', () => {
            bodyControl.setValue('*');
            expect(bodyControl.valid).toBeTruthy();
        });

        it('should allow numbers in bodys', () => {
            bodyControl.setValue('123655');
            expect(bodyControl.valid).toBeTruthy();
        });
    })

    describe('The category field', () => {
        let categoryControl: AbstractControl;

        beforeEach(() => {
            categoryControl = addTodoComponent.addTodoForm.controls['category'];
        });

        it('should not allow empty categorys', () => {
            categoryControl.setValue('');
            expect(categoryControl.valid).toBeFalsy();
        });

        it('should fail single character categorys', () => {
            categoryControl.setValue('x');
            expect(categoryControl.valid).toBeFalsy();
            expect(categoryControl.hasError('min')).toBeTruthy();
        });

        it('should fail too large categorys', () => {
            categoryControl.setValue('x'.repeat(16));
            expect(categoryControl.valid).toBeFalsy();
            expect(categoryControl.hasError('max')).toBeTruthy();
        });

        it('should allow character categorys', () => {
            categoryControl.setValue('*');
            expect(categoryControl.valid).toBeTruthy();
        });

        it('should allow numbers in categorys', () => {
            categoryControl.setValue('123655');
            expect(categoryControl.valid).toBeTruthy();
        });

    });

    describe('The status field', () => {
        let statusControl: AbstractControl;

        beforeEach(() => {
            statusControl = addTodoComponent.addTodoForm.controls['status'];
        });

        it('should not allow empty statuss', () => {
            statusControl.setValue('');
            expect(statusControl.valid).toBeFalsy();
        });

        it('should allow Incomplete', () => {
            statusControl.setValue('Incomplete');
            expect(statusControl.valid).toBeTruthy();
        });

        it('should allow Complete', () => {
            statusControl.setValue('Complete');
            expect(statusControl.valid).toBeTruthy();
        });

        it('should other statuss', () => {
            statusControl.setValue('Elle Woods');
            expect(statusControl.valid).toBeFalsy();
            expect(statusControl.hasError('pattern')).toBeTruthy();
        });

     });
});
