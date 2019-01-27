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
import { initialState, ordersReducer } from './orders.reducer';

describe('OrdersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = ordersReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE action', () => {
    it('should set loading to true', () => {
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
      const { loading, error } = ordersReducer(initialState, action);

      expect(loading).toEqual(true);
      expect(error).toEqual(null);
    });
  });

  describe('CREATE_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const action = new CreateOrderSuccess();
      const { loading } = ordersReducer(initialState, action);
      expect(loading).toEqual(false);
    });
  });

  describe('CREATE_FAIL Action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' } as any;
      const action = new CreateOrderFail(payload);
      const { loading, error } = ordersReducer(initialState, action);
      expect(loading).toEqual(false);
      expect(error).toEqual(payload);
    });
  });

  describe('UPDATE action', () => {
    it('should set loading to true', () => {
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
      const { loading, error } = ordersReducer(initialState, action);

      expect(loading).toEqual(true);
      expect(error).toEqual(null);
    });
  });

  describe('UPDATE_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const action = new UpdateOrderSuccess();
      const { loading } = ordersReducer(initialState, action);
      expect(loading).toEqual(false);
    });
  });

  describe('UPDATE_FAIL Action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' } as any;
      const action = new UpdateOrderFail(payload);
      const { loading, error } = ordersReducer(initialState, action);
      expect(loading).toEqual(false);
      expect(error).toEqual(payload);
    });
  });

  describe('FILTER_CHANGE action', () => {
    it('should set filter value to payload', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };
      const action = new FilterChange(payload);
      const { filter } = ordersReducer(initialState, action);

      expect(filter).toEqual(payload);
    });
  });

  describe('SORTING_CHANGE Action', () => {
    it('should set sorting value to payload', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };
      const action = new SortingChange(payload);
      const { sorting } = ordersReducer(initialState, action);

      expect(sorting).toEqual(payload);
    });
  });

  describe('PAGE_CHANGE Action', () => {
    it('should set paging value to payload', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 10 };
      const action = new PageChange(payload);
      const { pagination } = ordersReducer(initialState, action);
      expect(pagination).toEqual(payload);
    });
  });
});
