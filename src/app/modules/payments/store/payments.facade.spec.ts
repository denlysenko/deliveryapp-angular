import { async, TestBed } from '@angular/core/testing';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { Payment } from '../models';
import {
  FilterChange,
  PageChange,
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
    store = TestBed.get(Store);
    facade = TestBed.get(PaymentsFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('current$', () => {
    it('should return current$', () => {
      let result;
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      facade.current$.subscribe(value => {
        result = value;
      });

      store.dispatch(new SelectPayment(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('filter$', () => {
    it('should return current filter$', () => {
      let result;
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      facade.filter$.subscribe(value => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('sorting$', () => {
    it('should return current sorting$', () => {
      let result;
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };

      facade.sorting$.subscribe(value => {
        result = value;
      });

      store.dispatch(new SortingChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('pagination$', () => {
    it('should return current pagination$', () => {
      let result;
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.pagination$.subscribe(value => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('allFilters$', () => {
    it('should return current allFilters$', () => {
      let result;
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.allFilters$.subscribe(value => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual({
        'order[id]': 'asc',
        offset: 10,
        limit: 10
      });
    });
  });

  describe('doFiltering()', () => {
    it('should dispatch a FilterChange action', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'filter'
      };
      const action = new FilterChange(payload);

      facade.doFiltering(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('sort()', () => {
    it('should dispatch a SortingChange action', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
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
});
