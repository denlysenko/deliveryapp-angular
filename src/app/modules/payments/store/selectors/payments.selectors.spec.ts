import { TestBed } from '@angular/core/testing';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { Payment } from '../../models';
import {
  CreatePayment,
  CreatePaymentFail,
  CreatePaymentSuccess,
  FilterChange,
  PageChange,
  SortingChange
} from '../actions';
import { paymentsReducer, PaymentsState } from '../reducers';
import {
  getAllFilters,
  getError,
  getFilter,
  getLoading,
  getPagination,
  getSorting
} from './payments.selectors';

describe('Payments Selectors', () => {
  let store: Store<PaymentsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          payments: paymentsReducer
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getLoading', () => {
    it('should return true when CreatePayment was dispatched', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      let result;

      store.select(getLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new CreatePayment(payload));
      expect(result).toEqual(true);
    });

    it('should return false when CreatePaymentSuccess was dispatched', () => {
      let result;

      store.select(getLoading).subscribe(value => {
        result = value;
      });

      store.dispatch(new CreatePaymentSuccess());
      expect(result).toEqual(false);
    });
  });

  describe('getError', () => {
    it('should return error', () => {
      const orderError = {
        message: 'Error'
      } as any;

      let result;

      store.select(getError).subscribe(value => {
        result = value;
      });

      store.dispatch(new CreatePaymentFail(orderError));
      expect(result).toEqual(orderError);
    });
  });

  describe('getFilter', () => {
    it('should return filter value', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      let result;

      store.select(getFilter).subscribe(value => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getSorting', () => {
    it('should return sorting value', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };

      let result;

      store.select(getSorting).subscribe(value => {
        result = value;
      });

      store.dispatch(new SortingChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getPagination', () => {
    it('should return pagination value', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      let result;

      store.select(getPagination).subscribe(value => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getAllFilters', () => {
    it('should return combined filter value', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      let result;

      store.select(getAllFilters).subscribe(value => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual({
        'filter[smth]': 'test',
        'order[id]': 'asc',
        offset: 0,
        limit: 10
      });
    });
  });
});
