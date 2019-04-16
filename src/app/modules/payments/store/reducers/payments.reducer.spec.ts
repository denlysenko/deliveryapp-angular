import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Payment } from '../../models';
import {
  FilterChange,
  PageChange,
  SelectPayment,
  SortingChange
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

  describe('SELECT action', () => {
    it('should set payment', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };
      const action = new SelectPayment(payload);
      const { current } = paymentsReducer(initialState, action);

      expect(current).toEqual(payload);
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
