import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { emailValidator } from '@common/validators';

import { FeedbackService } from '@core/services';

import { InputMaskModule } from '@ui/inputmask';

import { ContactsFormComponent } from './contacts-form.component';

describe('ContactsFormComponent', () => {
  let component: ContactsFormComponent;
  let fixture: ComponentFixture<ContactsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputMaskModule],
      declarations: [ContactsFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            error: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      company: new FormControl(null),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, emailValidator])
      ),
      phone: new FormControl(null)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validations', () => {
    describe('email field', () => {
      let email: AbstractControl;

      beforeEach(() => {
        email = component.form.get('email');
      });

      it('email field should have required error', () => {
        email.setValue(null);
        expect(email.hasError('required')).toEqual(true);
      });

      it('email field should not have required error', () => {
        email.setValue('test@test.com');
        expect(email.hasError('required')).toEqual(false);
      });

      it('email field should have email error', () => {
        email.setValue('test');
        expect(email.hasError('email')).toEqual(true);
      });

      it('email field should not have email error', () => {
        email.setValue('test@test.com');
        expect(email.hasError('email')).toEqual(false);
      });
    });
  });
});
