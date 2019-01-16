import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { FilterChangeEvent, PageChangeEvent, SortingChangeEvent } from '@core/models';
import * as fromRoot from '@core/store';

import { Order } from '../../models/order.model';
import { CreateOrder, CreateOrderFail, CreateOrderSuccess, FilterChange, PageChange, SortingChange } from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from './orders.selectors';

describe('Orders Selectors', () => {
  let store: Store<fromReducers.OrdersState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          orders: fromReducers.reducer
        })
      ]
    });

    store = TestBed.get(Store);
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

      let result;

      store.select(fromSelectors.getLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new CreateOrder(payload));
      expect(result).toEqual(true);
    });

    it('should return false when CreateOrderSuccess was dispatched', () => {
      let result;

      store.select(fromSelectors.getLoading).subscribe(value => {
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

      let result;

      store.select(fromSelectors.getError).subscribe(value => {
        result = value;
      });

      store.dispatch(new CreateOrderFail(orderError));
      expect(result).toEqual(orderError);
    });
  });

  describe('getFilter', () => {
    it('should return filter value', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      let result;

      store.select(fromSelectors.getFilter).subscribe(value => {
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

      store.select(fromSelectors.getSorting).subscribe(value => {
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

      store.select(fromSelectors.getPagination).subscribe(value => {
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

      store.select(fromSelectors.getAllFilters).subscribe(value => {
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
