import { Order } from '../../models/order.model';
import * as fromActions from '../actions/orders.actions';
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
      const action = new fromActions.CreateOrder(payload);
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('CREATE_ORDER_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromOrders;
      const action = new fromActions.CreateOrderSuccess();
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(false);
    });
  });

  describe('CREATE_ORDER_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromOrders;
      const payload = { message: 'Error message' };
      const action = new fromActions.CreateOrderFail(payload);
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
      const action = new fromActions.UpdateOrder(payload);
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('UPDATE_ORDER_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromOrders;
      const action = new fromActions.UpdateOrderSuccess();
      const state = fromOrders.reducer(initialState, action);

      expect(state.loading).toEqual(false);
    });
  });

  describe('UPDATE_ORDER_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromOrders;
      const payload = { message: 'Error message' };
      const action = new fromActions.UpdateOrderFail(payload);
      const state = fromOrders.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });
});
