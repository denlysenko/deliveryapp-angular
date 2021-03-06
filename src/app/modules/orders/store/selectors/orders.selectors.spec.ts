import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Order, OrdersFilter } from '../../models/';
import {
  CreateOrder,
  CreateOrderFail,
  CreateOrderSuccess,
  FilterChange,
  PageChange,
  SortingChange
} from '../actions';
import { ordersReducer, OrdersState } from '../reducers';
import {
  getAllFilters,
  getError,
  getFilter,
  getLoading,
  getPagination,
  getSorting
} from './orders.selectors';

describe('Orders Selectors', () => {
  let store: Store<OrdersState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            orders: ordersReducer
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

  describe('getLoading', () => {
    it('should return true when CreateOrder was dispatched', () => {
      const payload: Order = {
        cityFrom: 'test',
        cityTo: 'test',
        addressFrom: 'test',
        addressTo: 'test',
        cargoName: 'test',
        cargoWeight: 1,
        senderEmail: 'test@test.com',
        senderPhone: '1232123'
      };

      let result: boolean;

      store.select(getLoading).subscribe((value) => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new CreateOrder(payload));
      expect(result).toEqual(true);
    });

    it('should return false when CreateOrderSuccess was dispatched', () => {
      let result: boolean;

      store.select(getLoading).subscribe((value) => {
        result = value;
      });

      store.dispatch(new CreateOrderSuccess());
      expect(result).toEqual(false);
    });
  });

  describe('getError', () => {
    it('should return error', () => {
      const orderError = {
        message: 'Error'
      } as any;

      let result: any;

      store.select(getError).subscribe((value) => {
        result = value;
      });

      store.dispatch(new CreateOrderFail(orderError));
      expect(result).toEqual(orderError);
    });
  });

  describe('getFilter', () => {
    it('should return filter value', () => {
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      let result: OrdersFilter['filter'];

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

      let result: OrdersFilter['order'];

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

      let result: OrdersFilter;

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
