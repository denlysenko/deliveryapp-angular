import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { User } from '../../models';
import {
  FilterChange,
  PageChange,
  SelectUser,
  SortingChange,
  UsersActionTypes
} from './users.actions';

describe('Users Actions', () => {
  describe('SelectUser', () => {
    it('should create an action', () => {
      const payload: User = {
        email: 'new_user@test.com'
      };

      const action = new SelectUser(payload);
      expect({ ...action }).toEqual({
        type: UsersActionTypes.SELECT,
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
        type: UsersActionTypes.FILTER_CHANGE,
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
        type: UsersActionTypes.SORTING_CHANGE,
        payload
      });
    });
  });

  describe('PageChange', () => {
    it('should create an action', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 0 };

      const action = new PageChange(payload);
      expect({ ...action }).toEqual({
        type: UsersActionTypes.PAGE_CHANGE,
        payload
      });
    });
  });
});
