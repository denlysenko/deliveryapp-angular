import { FilterChangeEvent, PageChangeEvent, SortingChangeEvent } from '@common/models';

import { Order } from '../../models/order.model';
import {
  CreateOrder,
  CreateOrderFail,
  CreateOrderSuccess,
  FilterChange,
  PageChange,
  SortingChange,
  UpdateOrder,
  UpdateOrderFail,
  UpdateOrderSuccess,
} from '../actions/orders.actions';
import * as fromOrders from './orders.reducer';

describe('OrdersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromOrders;
      const action = {} as any;
      const state = fromOrders.reducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE_ORDER action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromOrders;
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
      const action = new CreateOrder(payload);
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('CREATE_ORDER_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromOrders;
      const action = new CreateOrderSuccess();
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(false);
    });
  });

  describe('CREATE_ORDER_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromOrders;
      const payload = { message: 'Error message' } as any;
      const action = new CreateOrderFail(payload);
      const state = fromOrders.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });

  describe('UPDATE_ORDER action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromOrders;
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
      const action = new UpdateOrder(payload);
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('UPDATE_ORDER_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromOrders;
      const action = new UpdateOrderSuccess();
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(false);
    });
  });

  describe('UPDATE_ORDER_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromOrders;
      const payload = { message: 'Error message' } as any;
      const action = new UpdateOrderFail(payload);
      const state = fromOrders.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });

  describe('FILTER_CHANGE action', () => {
    it('should set filter value to payload', () => {
      const { initialState } = fromOrders;
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };
      const action = new FilterChange(payload);
      const state = fromOrders.reducer(initialState, action);

      expect(state.filter).toEqual(payload);
    });
  });

  describe('SORTING_CHANGE Action', () => {
    it('should set sorting value to payload', () => {
      const { initialState } = fromOrders;
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };
      const action = new SortingChange(payload);
      const state = fromOrders.reducer(initialState, action);

      expect(state.sorting).toEqual(payload);
    });
  });

  describe('PAGE_CHANGE Action', () => {
    it('should set paging value to payload', () => {
      const { initialState } = fromOrders;
      const payload: PageChangeEvent = { limit: 10, offset: 10 };
      const action = new PageChange(payload);
      const state = fromOrders.reducer(initialState, action);
      expect(state.pagination).toEqual(payload);
    });
  });
});
