import { TestBed } from '@angular/core/testing';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { Payment, PaymentsFilter } from '../../models';
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
      ]
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCurrent', () => {
    it('should return current payment', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      let result: Payment;

      store.select(getCurrent).subscribe((value) => {
        result = value;
      });

      store.dispatch(new SelectPayment(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getFilter', () => {
    it('should return filter value', () => {
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      let result: PaymentsFilter['filter'];

      store.select(getFilter).subscribe((value) => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getSorting', () => {
    it('should return sorting value', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };

      let result: PaymentsFilter['order'];

      store.select(getSorting).subscribe((value) => {
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

      let result: PageChangeEvent;

      store.select(getPagination).subscribe((value) => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getAllFilters', () => {
    it('should return combined filter value', () => {
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      let result: PaymentsFilter;

      store.select(getAllFilters).subscribe((value) => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual({
        filter: {
          smth: 'test'
        },
        order: {
          id: 'desc'
        },

        offset: 0,
        limit: 10
      });
    });
  });
});
