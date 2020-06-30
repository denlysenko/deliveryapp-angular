import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

import { UsersService } from '@users/services/users.service';

import { ERROR_MESSAGE } from '../../constants';
import { CargoFormComponent } from '../cargo-form/cargo-form.component';
import { DestinationFormComponent } from '../destination-form/destination-form.component';
import { SenderFormComponent } from '../sender-form/sender-form.component';
import { CreateOrderFormComponent } from './create-order-form.component';

const error: ValidationError = {
  name: 'Validation Error',
  errors: [
    {
      message: 'error',
      type: '',
      path: 'cargoName',
      value: '',
      origin: '',
      validatorKey: '',
      validatorName: '',
      validatorArgs: []
    },
    {
      message: 'error',
      type: '',
      path: 'cityTo',
      value: '',
      origin: '',
      validatorKey: '',
      validatorName: '',
      validatorArgs: []
    }
  ]
};

const feedbackServiceStub = {
  error: jest.fn()
};

describe('CreateOrderFormComponent', () => {
  let component: CreateOrderFormComponent;
  let fixture: ComponentFixture<CreateOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateOrderFormComponent,
        DestinationFormComponent,
        CargoFormComponent,
        SenderFormComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FeedbackService,
          useValue: feedbackServiceStub
        },
        {
          provide: UsersService,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.value).toEqual({
      [component.formGroupKeys.destinationForm]: {
        cityFrom: null,
        cityTo: null,
        addressFrom: null,
        addressTo: null,
        additionalData: null,
        clientId: null
      },
      [component.formGroupKeys.cargoForm]: {
        cargoName: null,
        cargoWeight: null,
        cargoVolume: null,
        comment: null
      },
      [component.formGroupKeys.senderForm]: {
        senderCompany: null,
        senderName: null,
        senderEmail: null,
        senderPhone: null
      }
    });
  });

  describe('submitForm()', () => {
    it('should emit submitted event', () => {
      spyOn(component.submitted, 'emit');
      const formValue = {
        cityFrom: null,
        cityTo: null,
        addressFrom: null,
        addressTo: null,
        additionalData: null,
        clientId: null,
        cargoName: null,
        cargoWeight: null,
        cargoVolume: null,
        comment: null,
        senderCompany: null,
        senderName: null,
        senderEmail: null,
        senderPhone: null
      };

      component.submitForm();

      expect(component.submitted.emit).toHaveBeenCalledWith(formValue);
    });
  });

  describe('handleError()', () => {
    beforeEach(() => {
      component.error = error;
      fixture.detectChanges();
    });

    it('should set activeIndex = 0', () => {
      expect(component.activeIndex).toEqual(0);
    });

    it('should invalidate controls', () => {
      expect(
        component.form
          .get(`${component.formGroupKeys.cargoForm}.cargoName`)
          .hasError('serverError')
      ).toBeTruthy();

      expect(
        component.form
          .get(`${component.formGroupKeys.destinationForm}.cityTo`)
          .hasError('serverError')
      ).toBeTruthy();
    });

    it('should update errors hash', () => {
      expect(component.errors).toEqual({
        cargoName: 'error',
        cityTo: 'error'
      });
    });

    it('should show error toast', () => {
      const feedbackService: FeedbackService = TestBed.inject(FeedbackService);
      expect(feedbackService.error).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });
});
