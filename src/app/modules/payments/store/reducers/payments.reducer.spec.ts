import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Payment } from '../../models';
import {
  CreatePayment,
  CreatePaymentFail,
  CreatePaymentSuccess,
  FilterChange,
  PageChange,
  SortingChange,
  UpdatePayment,
  UpdatePaymentFail,
  UpdatePaymentSuccess
} from '../actions';
import { initialState, paymentsReducer } from './payments.reducer';

describe('PaymentsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = paymentsReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE action', () => {
    it('should set loading to true', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };
      const action = new CreatePayment(payload);
      const { loading, error } = paymentsReducer(initialState, action);

      expect(loading).toEqual(true);
      expect(error).toEqual(null);
    });
  });

  describe('CREATE_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const action = new CreatePaymentSuccess();
      const { loading } = paymentsReducer(initialState, action);
      expect(loading).toEqual(false);
    });
  });

  describe('CREATE_FAIL Action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' } as any;
      const action = new CreatePaymentFail(payload);
      const { loading, error } = paymentsReducer(initialState, action);
      expect(loading).toEqual(false);
      expect(error).toEqual(payload);
    });
  });

  describe('UPDATE action', () => {
    it('should set loading to true', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };
      const action = new UpdatePayment(payload);
      const { loading, error } = paymentsReducer(initialState, action);

      expect(loading).toEqual(true);
      expect(error).toEqual(null);
    });
  });

  describe('UPDATE_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const action = new UpdatePaymentSuccess();
      const { loading } = paymentsReducer(initialState, action);
      expect(loading).toEqual(false);
    });
  });

  describe('UPDATE_FAIL Action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' } as any;
      const action = new UpdatePaymentFail(payload);
      const { loading, error } = paymentsReducer(initialState, action);
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
      const { filter } = paymentsReducer(initialState, action);

      expect(filter).toEqual(payload);
    });
  });

  describe('SORTING_CHANGE Action', () => {
    it('should set sorting value to payload', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };
      const action = new SortingChange(payload);
      const { sorting } = paymentsReducer(initialState, action);

      expect(sorting).toEqual(payload);
    });
  });

  describe('PAGE_CHANGE Action', () => {
    it('should set paging value to payload', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 10 };
      const action = new PageChange(payload);
      const { pagination } = paymentsReducer(initialState, action);
      expect(pagination).toEqual(payload);
    });
  });
});
