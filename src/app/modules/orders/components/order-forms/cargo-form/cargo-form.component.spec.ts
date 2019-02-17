import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { SpinnerModule } from 'primeng/primeng';

import { CargoFormComponent } from './cargo-form.component';

describe('CargoFormComponent', () => {
  let component: CargoFormComponent;
  let fixture: ComponentFixture<CargoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SpinnerModule],
      declarations: [CargoFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup(
      {
        cargoName: new FormControl(null, Validators.required),
        cargoWeight: new FormControl(null, Validators.required),
        cargoVolume: new FormControl(null),
        comment: new FormControl(null)
      },
      { updateOn: 'submit' }
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
        expect(cargoNameField.hasError('cargoName')).toBeFalsy();
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
        cargoWeightField.setValue('3');
        expect(cargoWeightField.hasError('cargoName')).toBeFalsy();
      });
    });
  });

  describe('nextStep()', () => {
    beforeEach(() => {
      spyOn(component.next, 'emit');
    });

    it('should emit next event if form is valid', () => {
      const cargoName = component.form.get('cargoName');
      cargoName.setValue('test');

      const cargoWeight = component.form.get('cargoWeight');
      cargoWeight.setValue(3);

      component.nextStep();

      expect(component.next.emit).toHaveBeenCalled();
    });

    it('should not emit next event if form is invalid', () => {
      const cargoName = component.form.get('cargoName');
      cargoName.setValue('');

      component.nextStep();

      expect(component.next.emit).not.toHaveBeenCalled();
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
