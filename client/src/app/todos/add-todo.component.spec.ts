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
import { MatIconModule } from '@angular/material/icon';

describe('AddTodoComponent', () => {
    let addTodoComponent: AddTodoComponent;
    let addTodoForm: FormGroup;
    let calledClose: boolean;
    let fixture: ComponentFixture<AddTodoComponent>;
    const mockTodoService = new MockTodoService();

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
                RouterTestingModule,
                MatIconModule,
              ],
            declarations: [AddTodoComponent],
            providers: [{ provide: TodoService, useValue: new MockTodoService() }]
        }).compileComponents().catch(error => {
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
            ownerControl.setValue('X');
            expect(ownerControl.valid).toBeFalsy();
            expect(ownerControl.hasError('minlength')).toBeTruthy();
        });

        it('should fail too large owners', () => {
            ownerControl.setValue('x'.repeat(60));
            expect(ownerControl.valid).toBeFalsy();
            expect(ownerControl.hasError('maxlength')).toBeTruthy();
        });

        it('should fail special character owners', () => {
            ownerControl.setValue('*');
            expect(ownerControl.valid).toBeFalsy();
            expect(ownerControl.hasError('pattern')).toBeTruthy();
        });

        it('should not allow numbers in owners', () => {
            ownerControl.setValue('123655');
            expect(ownerControl.valid).toBeFalsy();
            expect(ownerControl.hasError('pattern')).toBeTruthy();
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
            expect(bodyControl.hasError('minlength')).toBeTruthy();
        });

        it('should fail too large bodys', () => {
            bodyControl.setValue('x'.repeat(201));
            expect(bodyControl.valid).toBeFalsy();
            expect(bodyControl.hasError('maxlength')).toBeTruthy();
        });

        it('should not allow special character bodys', () => {
            bodyControl.setValue('*');
            expect(bodyControl.valid).toBeFalsy();
        });

        it('should allow numbers in bodys', () => {
            bodyControl.setValue('123655');
            expect(bodyControl.valid).toBeTruthy();
        });
    });

    describe('The category field', () => {
        let categoryControl: AbstractControl;

        beforeEach(() => {
            categoryControl = addTodoComponent.addTodoForm.controls['category'];
        });

        it('should not allow empty categories', () => {
            categoryControl.setValue('');
            expect(categoryControl.valid).toBeFalsy();
        });

        it('should not allow single character categories', () => {
            categoryControl.setValue('x');
            expect(categoryControl.valid).toBeFalsy();
            expect(categoryControl.hasError('minlength')).toBeTruthy();
        });

        it('should fail too large categories', () => {
            categoryControl.setValue('xxxxxxxxxxxxxxxx');
            expect(categoryControl.valid).toBeFalsy();
            expect(categoryControl.hasError('maxlength')).toBeTruthy();
        });

        it('should not allow special character categories', () => {
            categoryControl.setValue('*');
            expect(categoryControl.valid).toBeFalsy();
        });

        it('should allow numbers in categories', () => {
            categoryControl.setValue('123655');
            expect(categoryControl.valid).toBeTruthy();
        });

    });

    describe('The status field', () => {
        let statusControl: AbstractControl;

        beforeEach(() => {
            statusControl = addTodoForm.controls['status'];
        });

        it('should not allow empty statuss', () => {
            statusControl.setValue('');
            expect(statusControl.valid).toBeFalsy();
        });

        it('should allow false', () => {
            statusControl.setValue(false);
            expect(statusControl.valid).toBeTruthy();
        });

        it('should allow true', () => {
            statusControl.setValue(true);
            expect(statusControl.valid).toBeTruthy();
        });

        it('should not allow other statuss', () => {
            statusControl.setValue('Elle Woods');
            expect(statusControl.valid).toBeFalsy();
            expect(statusControl.hasError('pattern')).toBeTruthy();
        });

     });

    describe('submitting the form', () => {
        let ownerControl: AbstractControl;
        let statusControl: AbstractControl;
        let categoryControl: AbstractControl;
        let bodyControl: AbstractControl;

        beforeEach(() => {
          ownerControl = addTodoComponent.addTodoForm.controls[`owner`];
          statusControl = addTodoComponent.addTodoForm.controls[`status`];
          categoryControl = addTodoComponent.addTodoForm.controls[`category`];
          bodyControl = addTodoComponent.addTodoForm.controls[`body`];
          mockTodoService.todoArray = [];
        });
    });
});
