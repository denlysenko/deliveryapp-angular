import { async, TestBed } from '@angular/core/testing';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { Payment, PaymentsFilter } from '../models';
import {
  FilterChange,
  PageChange,
  ReloadPayments,
  SelectPayment,
  SortingChange
} from './actions';
import { PaymentsFacade } from './payments.facade';
import { paymentsReducer, PaymentsState } from './reducers';

// tslint:disable-next-line:no-big-function
describe('PaymentsFacade', () => {
  let store: Store<PaymentsState>;
  let facade: PaymentsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            payments: paymentsReducer
          },
          {
            runtimeChecks: {
              strictStateImmutability: false
            }
          }
        )
      ],
      providers: [PaymentsFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    facade = TestBed.inject(PaymentsFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('current$', () => {
    it('should return current$', () => {
      let result: Payment;
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      facade.current$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new SelectPayment(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('filter$', () => {
    it('should return current filter$', () => {
      let result: PaymentsFilter['filter'];
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      facade.filter$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('sorting$', () => {
    it('should return current sorting$', () => {
      let result: PaymentsFilter['order'];
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };

      facade.sorting$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new SortingChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('pagination$', () => {
    it('should return current pagination$', () => {
      let result: PageChangeEvent;
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.pagination$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('allFilters$', () => {
    it('should return current allFilters$', () => {
      let result: PaymentsFilter;
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.allFilters$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual({
        filter: {},
        order: {
          id: 'desc'
        },
        offset: 10,
        limit: 10
      });
    });
  });

  describe('doFiltering()', () => {
    it('should dispatch a FilterChange action', () => {
      const payload: FilterChangeEvent = {
        smth: 'filter'
      };
      const action = new FilterChange(payload);

      facade.doFiltering(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('sort()', () => {
    it('should dispatch a SortingChange action', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };
      const action = new SortingChange(payload);

      facade.sort(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('paginate()', () => {
    it('should dispatch a PageChange action', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };
      const action = new PageChange(payload);

      facade.paginate(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('select()', () => {
    it('should dispatch a SelectPayment action', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      const action = new SelectPayment(payload);

      facade.select(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('reload()', () => {
    it('should dispatch a ReloadPayments action', () => {
      const action = new ReloadPayments();

      facade.reload();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
