import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { InputMaskModule } from 'primeng/primeng';

import { SenderFormComponent } from './sender-form.component';

describe('SenderFormComponent', () => {
  let component: SenderFormComponent;
  let fixture: ComponentFixture<SenderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputMaskModule],
      declarations: [SenderFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup(
      {
        senderCompany: new FormControl(null),
        senderName: new FormControl(null),
        senderEmail: new FormControl(null, Validators.required),
        senderPhone: new FormControl(null, Validators.required)
      },
      { updateOn: 'blur' }
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
  });

  describe('Validations', () => {
    describe('senderEmail field', () => {
      let senderEmailField: AbstractControl;

      beforeEach(() => {
        senderEmailField = component.form.get('senderEmail');
      });

      it('should have required error', () => {
        senderEmailField.setValue('');
        expect(senderEmailField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        senderEmailField.setValue('test@test.com');
        expect(senderEmailField.hasError('required')).toBeFalsy();
      });
    });

    describe('senderPhone field', () => {
      let senderPhoneField: AbstractControl;

      beforeEach(() => {
        senderPhoneField = component.form.get('senderPhone');
      });

      it('should have required error', () => {
        senderPhoneField.setValue('');
        expect(senderPhoneField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        senderPhoneField.setValue('12345678');
        expect(senderPhoneField.hasError('required')).toBeFalsy();
      });
    });
  });

  describe('submitForm()', () => {
    let senderEmailField: AbstractControl;
    let senderPhoneField: AbstractControl;

    beforeEach(() => {
      spyOn(component.save, 'emit');
      senderEmailField = component.form.get('senderEmail');
      senderPhoneField = component.form.get('senderPhone');
    });

    it('should emit save event if form is valid', () => {
      senderEmailField.setValue('test@test.com');
      senderPhoneField.setValue('12345');

      component.submitForm();

      expect(component.save.emit).toHaveBeenCalled();
    });

    it('should not emit save event if form is invalid', () => {
      senderEmailField.setValue('');
      senderPhoneField.setValue('');

      component.submitForm();

      expect(component.save.emit).not.toHaveBeenCalled();
    });
  });

  describe('prevStep()', () => {
    it('should emit prev event', () => {
      spyOn(component.prev, 'emit');

      component.prevStep();

      expect(component.prev.emit).toHaveBeenCalled();
    });
  });
});
