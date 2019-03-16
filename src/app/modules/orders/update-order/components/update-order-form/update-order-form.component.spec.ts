import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';

import { Roles } from '@common/enums';

import { UpdateOrderFormComponent } from './update-order-form.component';

const order = {
  id: null,
  cityFrom: 'cityFrom',
  cityTo: 'cityTo',
  addressFrom: 'addressFrom',
  addressTo: 'addressTo',
  cargoName: 'cargoName',
  cargoWeight: 10,
  senderEmail: 'test@test.com',
  senderPhone: '1234',
  additionalData: null,
  comment: null,
  cargoVolume: null,
  senderName: null,
  senderCompany: null
};

// tslint:disable-next-line:no-big-function
describe('UpdateOrderFormComponent', () => {
  let component: UpdateOrderFormComponent;
  let fixture: ComponentFixture<UpdateOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrderFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderFormComponent);
    component = fixture.componentInstance;
    component.order = order;
    component.role = Roles.CLIENT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
  });

  describe('Validations', () => {
    describe('cityFrom field', () => {
      let cityFromField: AbstractControl;

      beforeEach(() => {
        cityFromField = component.form.get('cityFrom');
      });

      it('should have required error', () => {
        cityFromField.setValue('');
        expect(cityFromField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        cityFromField.setValue('test');
        expect(cityFromField.hasError('required')).toBeFalsy();
      });
    });

    describe('cityTo field', () => {
      let cityToField: AbstractControl;

      beforeEach(() => {
        cityToField = component.form.get('cityTo');
      });

      it('should have required error', () => {
        cityToField.setValue('');
        expect(cityToField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        cityToField.setValue('test');
        expect(cityToField.hasError('required')).toBeFalsy();
      });
    });

    describe('addressFrom field', () => {
      let addressFromField: AbstractControl;

      beforeEach(() => {
        addressFromField = component.form.get('addressFrom');
      });

      it('should have required error', () => {
        addressFromField.setValue('');
        expect(addressFromField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        addressFromField.setValue('test');
        expect(addressFromField.hasError('required')).toBeFalsy();
      });
    });

    describe('addressTo field', () => {
      let addressToField: AbstractControl;

      beforeEach(() => {
        addressToField = component.form.get('addressTo');
      });

      it('should have required error', () => {
        addressToField.setValue('');
        expect(addressToField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        addressToField.setValue('test');
        expect(addressToField.hasError('required')).toBeFalsy();
      });
    });

    describe('cargoName field', () => {
      let cargoNameField: AbstractControl;

      beforeEach(() => {
        cargoNameField = component.form.get('cargoName');
      });

      it('should have required error', () => {
        cargoNameField.setValue('');
        expect(cargoNameField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        cargoNameField.setValue('test');
        expect(cargoNameField.hasError('required')).toBeFalsy();
      });
    });

    describe('cargoWeight field', () => {
      let cargoWeightField: AbstractControl;

      beforeEach(() => {
        cargoWeightField = component.form.get('cargoWeight');
      });

      it('should have required error', () => {
        cargoWeightField.setValue('');
        expect(cargoWeightField.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        cargoWeightField.setValue('test');
        expect(cargoWeightField.hasError('required')).toBeFalsy();
      });
    });

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
        senderEmailField.setValue('test');
        expect(senderEmailField.hasError('required')).toBeFalsy();
      });

      it('should have email error', () => {
        senderEmailField.setValue('test');
        expect(senderEmailField.hasError('email')).toBeTruthy();
      });

      it('should not have email error', () => {
        senderEmailField.setValue('test@test.com');
        expect(senderEmailField.hasError('email')).toBeFalsy();
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
        senderPhoneField.setValue('test');
        expect(senderPhoneField.hasError('required')).toBeFalsy();
      });
    });
  });

  describe('goBack()', () => {
    it('should emit back event', () => {
      spyOn(component.back, 'emit');
      component.goBack();
      expect(component.back.emit).toHaveBeenCalled();
    });
  });

  describe('submitForm()', () => {
    beforeEach(() => {
      spyOn(component.submitted, 'emit');
    });

    it('should emit orderUpdated event if form is valid', () => {
      component.submitForm();
      expect(component.submitted.emit).toHaveBeenCalledWith(order);
    });

    it('should not emit submitted event if form is invalid', () => {
      component.form.patchValue({ cityFrom: '' });
      component.submitForm();
      expect(component.submitted.emit).not.toHaveBeenCalled();
    });
  });
});
