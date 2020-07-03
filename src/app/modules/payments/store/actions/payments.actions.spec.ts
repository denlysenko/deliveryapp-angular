import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Payment } from '../../models';
import {
  FilterChange,
  PageChange,
  PaymentsActionTypes,
  ReloadPayments,
  SelectPayment,
  SortingChange
} from './payments.actions';

describe('Payments Actions', () => {
  describe('SelectPayment', () => {
    it('should create an action', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      const action = new SelectPayment(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.SELECT,
        payload
      });
    });
  });

  describe('FilterChange', () => {
    it('should create an action', () => {
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      const action = new FilterChange(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.FILTER_CHANGE,
        payload
      });
    });
  });

  describe('SortingChange', () => {
    it('should create an action', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };

      const action = new SortingChange(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.SORTING_CHANGE,
        payload
      });
    });
  });

  describe('PageChange', () => {
    it('should create an action', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 0 };

      const action = new PageChange(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.PAGE_CHANGE,
        payload
      });
    });
  });

  describe('ReloadPayments', () => {
    it('should create an action', () => {
      const action = new ReloadPayments();
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.RELOAD
      });
    });
  });
});
