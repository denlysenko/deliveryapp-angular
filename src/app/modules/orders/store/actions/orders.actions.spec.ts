import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Order } from '../../models';
import {
  CreateOrder,
  CreateOrderFail,
  CreateOrderSuccess,
  FilterChange,
  OrdersActionTypes,
  PageChange,
  SortingChange,
  UpdateOrder,
  UpdateOrderFail,
  UpdateOrderSuccess
} from './orders.actions';

describe('Orders Actions', () => {
  describe('CreateOrder', () => {
    it('should create an action', () => {
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
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.CREATE,
        payload
      });
    });
  });

  describe('CreateOrderSuccess', () => {
    it('should create an action', () => {
      const action = new CreateOrderSuccess();
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.CREATE_SUCCESS
      });
    });
  });

  describe('CreateOrderFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new CreateOrderFail(payload);
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.CREATE_FAIL,
        payload
      });
    });
  });

  describe('UpdateOrder', () => {
    it('should create an action', () => {
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
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.UPDATE,
        payload
      });
    });
  });

  describe('UpdateOrderSuccess', () => {
    it('should create an action', () => {
      const action = new UpdateOrderSuccess();
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.UPDATE_SUCCESS
      });
    });
  });

  describe('UpdateOrderFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new UpdateOrderFail(payload);
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.UPDATE_FAIL,
        payload
      });
    });
  });

  describe('FilterChange', () => {
    it('should create an action', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      const action = new FilterChange(payload);
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.FILTER_CHANGE,
        payload
      });
    });
  });

  describe('SortingChange', () => {
    it('should create an action', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };

      const action = new SortingChange(payload);
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.SORTING_CHANGE,
        payload
      });
    });
  });

  describe('PageChange', () => {
    it('should create an action', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 0 };

      const action = new PageChange(payload);
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.PAGE_CHANGE,
        payload
      });
    });
  });
});
