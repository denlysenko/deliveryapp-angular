import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';

import { Roles } from '@common/enums';

import { OrdersService } from '@orders/services/orders.service';

import { UsersService } from '@users/services/users.service';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SpinnerModule } from 'primeng/spinner';

import { of } from 'rxjs';

import { PaymentFormComponent } from './payment-form.component';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AutoCompleteModule,
        DropdownModule,
        CalendarModule,
        SpinnerModule
      ],
      declarations: [PaymentFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            getOrders: jest.fn().mockReturnValue(of({ rows: [] }))
          }
        },
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn().mockReturnValue(of({ rows: [] }))
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    component.payment = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validations', () => {
    describe('total field', () => {
      let total: AbstractControl;

      beforeEach(() => {
        total = component.form.get('total');
      });

      it('should have required error', () => {
        total.setValue(null);
        expect(total.hasError('required')).toEqual(true);
      });

      it('should not have required error', () => {
        total.setValue(100);
        expect(total.hasError('required')).toEqual(false);
      });
    });

    describe('dueDate field', () => {
      let dueDate: AbstractControl;

      beforeEach(() => {
        dueDate = component.form.get('dueDate');
      });

      it('should have required error', () => {
        dueDate.setValue(null);
        expect(dueDate.hasError('required')).toEqual(true);
      });

      it('should not have required error', () => {
        dueDate.setValue(new Date());
        expect(dueDate.hasError('required')).toEqual(false);
      });
    });

    describe('orders field', () => {
      let orders: AbstractControl;

      beforeEach(() => {
        orders = component.form.get('orders');
      });

      it('should have required error', () => {
        orders.setValue(null);
        expect(orders.hasError('required')).toEqual(true);
      });

      it('should not have required error', () => {
        orders.setValue([1]);
        expect(orders.hasError('required')).toEqual(false);
      });
    });

    describe('clientId field', () => {
      let clientId: AbstractControl;

      beforeEach(() => {
        clientId = component.form.get('clientId');
      });

      it('clientId field should have required error', () => {
        clientId.setValue(null);
        expect(clientId.hasError('required')).toEqual(true);
      });

      it('clientId field should not have required error', () => {
        clientId.setValue(1);
        expect(clientId.hasError('required')).toEqual(false);
      });
    });
  });

  describe('submitForm()', () => {
    beforeEach(() => {
      spyOn(component.submitted, 'emit');
    });

    it('should emit submitted event if form is valid', () => {
      const payload = {
        id: null,
        total: 100,
        status: false,
        method: 1,
        dueDate: new Date(),
        orders: [1],
        paymentAmount: null,
        paymentDate: null,
        notes: null,
        description: null,
        clientId: 1
      };

      component.form.patchValue(payload);
      component.submitForm();
      expect(component.submitted.emit).toHaveBeenCalledWith(payload);
    });

    it('should not emit submitted event if form is invalid', () => {
      component.submitForm();
      expect(component.submitted.emit).not.toHaveBeenCalled();
    });
  });

  describe('searchOrder()', () => {
    it('should call ordersService.getOrders()', () => {
      const ordersService: OrdersService = TestBed.inject(OrdersService);
      component.searchOrder({ query: 1 });
      expect(ordersService.getOrders).toHaveBeenCalledWith({
        filter: {
          id: 1
        }
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
      component.selectClient({ id: 3 });
      expect(component.form.get('clientId').value).toEqual(3);
    });
  });
});
