import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Roles } from '@common/enums';

import { UsersService } from '@users/services/users.service';

import { DropdownModule } from 'primeng/dropdown';

import { of } from 'rxjs';

import { DestinationFormComponent } from './destination-form.component';

describe('DestinationFormComponent', () => {
  let component: DestinationFormComponent;
  let fixture: ComponentFixture<DestinationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DropdownModule],
      declarations: [DestinationFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn().mockReturnValue(of({}))
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      cityFrom: new FormControl(null, Validators.required),
      cityTo: new FormControl(null, Validators.required),
      addressFrom: new FormControl(null, Validators.required),
      addressTo: new FormControl(null, Validators.required),
      additionalData: new FormControl(null)
    });
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
  });

  describe('searchClient()', () => {
    it('should call usersService.getUsers()', () => {
      const usersService: UsersService = TestBed.inject(UsersService);
      component.searchClient({ query: 'test' });
      expect(usersService.getUsers).toHaveBeenCalledWith({
        filter: {
          role: [Roles.CLIENT],
          email: 'test'
        }
      });
    });
  });

  describe('selectClient()', () => {
    it('should patch form', () => {
      component.form.addControl('clientId', new FormControl(null));
      component.selectClient({ id: 3 });
      expect(component.form.get('clientId').value).toEqual(3);
    });
  });

  describe('nextStep()', () => {
    beforeEach(() => {
      spyOn(component.next, 'emit');
    });

    it('should emit next event if form is valid', () => {
      const cityFrom = component.form.get('cityFrom');
      cityFrom.setValue('test');

      const cityTo = component.form.get('cityTo');
      cityTo.setValue('test');

      const addressFrom = component.form.get('addressFrom');
      addressFrom.setValue('test');

      const addressTo = component.form.get('addressTo');
      addressTo.setValue('test');

      component.nextStep();

      expect(component.next.emit).toHaveBeenCalled();
    });

    it('should not emit next event if form is invalid', () => {
      const cityFrom = component.form.get('cityFrom');
      cityFrom.setValue('');

      component.nextStep();

      expect(component.next.emit).not.toHaveBeenCalled();
    });
  });
});
