import { Order } from '../../models';
import {
  CreateOrder,
  CreateOrderFail,
  CreateOrderSuccess,
  OrdersActionTypes,
  UpdateOrder,
  UpdateOrderFail,
  UpdateOrderSuccess,
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
        type: OrdersActionTypes.CREATE_ORDER,
        payload: payload
      });
    });
  });

  describe('CreateOrderSuccess', () => {
    it('should create an action', () => {
      const action = new CreateOrderSuccess();
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.CREATE_ORDER_SUCCESS
      });
    });
  });

  describe('CreateOrderFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new CreateOrderFail(payload);
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.CREATE_ORDER_FAIL,
        payload: payload
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
        type: OrdersActionTypes.UPDATE_ORDER,
        payload: payload
      });
    });
  });

  describe('UpdateOrderSuccess', () => {
    it('should create an action', () => {
      const action = new UpdateOrderSuccess();
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.UPDATE_ORDER_SUCCESS
      });
    });
  });

  describe('UpdateOrderFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new UpdateOrderFail(payload);
      expect({ ...action }).toEqual({
        type: OrdersActionTypes.UPDATE_ORDER_FAIL,
        payload: payload
      });
    });
  });
});
