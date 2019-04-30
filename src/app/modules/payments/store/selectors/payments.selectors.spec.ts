import { TestBed } from '@angular/core/testing';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { Payment } from '../../models';
import {
  FilterChange,
  PageChange,
  SelectPayment,
  SortingChange
} from '../actions';
import { paymentsReducer, PaymentsState } from '../reducers';
import {
  getAllFilters,
  getCurrent,
  getFilter,
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

  describe('getCurrent', () => {
    it('should return current payment', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      let result;

      store.select(getCurrent).subscribe(value => {
        result = value;
      });

      store.dispatch(new SelectPayment(payload));
      expect(result).toEqual(payload);
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
