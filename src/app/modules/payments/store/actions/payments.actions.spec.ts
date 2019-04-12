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
  PaymentsActionTypes,
  SortingChange,
  UpdatePayment,
  UpdatePaymentFail,
  UpdatePaymentSuccess
} from './payments.actions';

describe('Payments Actions', () => {
  describe('CreatePayment', () => {
    it('should create an action', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      const action = new CreatePayment(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.CREATE,
        payload
      });
    });
  });

  describe('CreatePaymentSuccess', () => {
    it('should create an action', () => {
      const action = new CreatePaymentSuccess();
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.CREATE_SUCCESS
      });
    });
  });

  describe('CreatePaymentFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new CreatePaymentFail(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.CREATE_FAIL,
        payload
      });
    });
  });

  describe('UpdatePayment', () => {
    it('should create an action', () => {
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      const action = new UpdatePayment(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.UPDATE,
        payload
      });
    });
  });

  describe('UpdatePaymentSuccess', () => {
    it('should create an action', () => {
      const action = new UpdatePaymentSuccess();
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.UPDATE_SUCCESS
      });
    });
  });

  describe('UpdatePaymentFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new UpdatePaymentFail(payload);
      expect({ ...action }).toEqual({
        type: PaymentsActionTypes.UPDATE_FAIL,
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
        type: PaymentsActionTypes.FILTER_CHANGE,
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
});
