import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { UserViewService } from '@user-view/user-view.service';

import { BehaviorSubject, of, throwError } from 'rxjs';

import { Payment } from '../../models';
import { PaymentsService } from '../../services/payments.service';
import { PaymentsFacade } from '../../store';
import { PaymentsPageComponent } from './payments-page.component';

const allFilters = new BehaviorSubject(null);
const role = new BehaviorSubject(null);

const payment: Payment = {
  id: 1,
  total: 5000,
  status: false,
  dueDate: new Date()
};

const activatedRouteStub = {
  snapshot: {
    data: {
      payments: {
        count: 0,
        rows: []
      }
    }
  }
};

const paymentsFacadeStub = {
  filter$: of({}),
  sorting$: of({}),
  pagination$: of({}),
  current$: of({}),
  allFilters$: allFilters.asObservable(),
  sort: jest.fn(),
  paginate: jest.fn(),
  doFiltering: jest.fn(),
  select: jest.fn()
};

const coreFacadeStub = {
  role$: role.asObservable()
};

const paymentsServiceStub = {
  getPaymentsSelf: jest.fn().mockReturnValue(of({ rows: [payment], count: 1 })),
  getPayments: jest.fn().mockReturnValue(of({ rows: [payment], count: 1 })),
  updatePayment: jest.fn().mockReturnValue(of(payment)),
  createPayment: jest.fn().mockReturnValue(of(payment))
};

const loaderServiceStub = {
  start: jest.fn(),
  stop: jest.fn()
};

const feedbackServiceStub = {
  success: jest.fn()
};

const userViewServiceStub = {
  show: jest.fn()
};

// tslint:disable-next-line:no-big-function
describe('PaymentsPageComponent', () => {
  let component: PaymentsPageComponent;
  let fixture: ComponentFixture<PaymentsPageComponent>;
  let paymentsFacade: PaymentsFacade;
  let paymentsService: PaymentsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: PaymentsFacade,
          useValue: paymentsFacadeStub
        },
        {
          provide: CoreFacade,
          useValue: coreFacadeStub
        },
        {
          provide: PaymentsService,
          useValue: paymentsServiceStub
        },
        {
          provide: LoaderService,
          useValue: loaderServiceStub
        },
        {
          provide: FeedbackService,
          useValue: feedbackServiceStub
        },
        {
          provide: UserViewService,
          useValue: userViewServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    allFilters.next({ limit: 10, offset: 0 });
    role.next(Roles.MANAGER);
    paymentsFacade = TestBed.get(PaymentsFacade);
    paymentsService = TestBed.get(PaymentsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `current$` defined', () => {
    expect(component.current$).toBeDefined();
  });

  it('should have `filter$` defined', () => {
    expect(component.filter$).toBeDefined();
  });

  it('should have `sorting$` defined', () => {
    expect(component.sorting$).toBeDefined();
  });

  it('should have `pagination$` defined', () => {
    expect(component.pagination$).toBeDefined();
  });

  it('should have `role$` defined', () => {
    expect(component.role$).toBeDefined();
  });

  describe('OnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should have payments from activatedRoute', () => {
      expect(component.payments).toEqual(
        activatedRouteStub.snapshot.data.payments.rows
      );
    });

    it('should have count from activatedRoute', () => {
      expect(component.count).toEqual(
        activatedRouteStub.snapshot.data.payments.count
      );
    });
  });

  describe('handleFilterChange()', () => {
    it('should call PaymentsFacade.doFiltering()', () => {
      const payload: FilterChangeEvent = {
        'order[smth]': 'desc'
      };

      component.handleFilterChange(payload);
      expect(paymentsFacade.doFiltering).toHaveBeenCalledWith(payload);
    });
  });

  describe('handleSortingChange()', () => {
    it('should call PaymentsFacade.sort()', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };

      component.handleSortingChange(payload);
      expect(paymentsFacade.sort).toHaveBeenCalledWith(payload);
    });
  });

  describe('handlePageChange()', () => {
    it('should call PaymentsFacade.paginate()', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      component.handlePageChange(payload);
      expect(paymentsFacade.paginate).toHaveBeenCalledWith(payload);
    });
  });

  describe('selectPayment()', () => {
    it('should call PaymentsFacade.select()', () => {
      component.selectPayment(payment);
      expect(paymentsFacade.select).toHaveBeenCalledWith(payment);
    });
  });

  describe('all filters changes', () => {
    const filter = {
      limit: 10,
      offset: 10
    };

    it('should start loader', () => {
      const loaderService: LoaderService = TestBed.get(LoaderService);
      allFilters.next(filter);
      expect(loaderService.start).toHaveBeenCalled();
    });

    it('should call getPaymentsSelf() for Roles.CLIENT', () => {
      role.next(Roles.CLIENT);
      allFilters.next(filter);
      expect(paymentsService.getPaymentsSelf).toHaveBeenCalledWith(filter);
    });

    it('should call getPayments() for !Roles.CLIENT', () => {
      allFilters.next(filter);
      expect(paymentsService.getPayments).toHaveBeenCalledWith(filter);
    });

    it('should stop loader', () => {
      const loaderService: LoaderService = TestBed.get(LoaderService);
      allFilters.next(filter);
      expect(loaderService.stop).toHaveBeenCalled();
    });

    it('should save new payments and count', () => {
      allFilters.next(filter);
      expect(component.payments).toEqual([payment]);
      expect(component.count).toEqual(1);
    });
  });

  describe('save()', () => {
    beforeEach(() => {
      loaderServiceStub.start.mockClear();
      loaderServiceStub.stop.mockClear();
      paymentsServiceStub.getPayments.mockClear();
    });

    it('should call updatePayment()', () => {
      component.save(payment);
      expect(paymentsService.updatePayment).toHaveBeenCalledWith(payment);
    });

    it('should call createPayment()', () => {
      const { id, ...newPayment } = payment;
      component.save(newPayment);
      expect(paymentsService.createPayment).toHaveBeenCalledWith(newPayment);
    });

    it('should start loader', () => {
      const loaderService: LoaderService = TestBed.get(LoaderService);
      component.save(payment);
      expect(loaderService.start).toHaveBeenCalled();
    });

    it('should call getPayments()', () => {
      component.save(payment);
      expect(paymentsService.getPayments).toHaveBeenCalledWith({
        limit: 10,
        offset: 0
      });
    });

    it('should stop loader', () => {
      const loaderService: LoaderService = TestBed.get(LoaderService);
      component.save(payment);
      expect(loaderService.stop).toHaveBeenCalled();
    });

    it('should show success message', () => {
      const feedbackService: FeedbackService = TestBed.get(FeedbackService);
      component.save(payment);
      expect(feedbackService.success).toHaveBeenCalled();
    });

    it('should send error to error$', () => {
      const error = { message: 'error' };
      // tslint:disable-next-line:no-shadowed-variable
      const paymentsService: PaymentsService = TestBed.get(PaymentsService);

      paymentsService.updatePayment = jest
        .fn()
        .mockReturnValue(throwError(error));

      let result;

      component.error$.subscribe(err => {
        result = err;
      });

      component.save(payment);
      expect(result).toEqual(error);
    });
  });

  describe('showUser()', () => {
    it('should call userViewService.show()', () => {
      const userViewService: UserViewService = TestBed.get(UserViewService);
      const userId = 1;

      component.showUser(userId);

      expect(userViewService.show).toHaveBeenCalledWith(userId);
    });
  });
});
