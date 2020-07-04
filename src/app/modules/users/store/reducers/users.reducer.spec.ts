import { Roles } from '@common/enums';
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
  SortingChange
} from '../actions';
import { initialState, usersReducer } from './users.reducer';

describe('UsersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = usersReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('SELECT action', () => {
    it('should set current payment', () => {
      const payload: User = {
        email: 'new_user@test.com'
      };
      const action = new SelectUser(payload);
      const { current } = usersReducer(initialState, action);

      expect(current).toEqual(payload);
    });
  });

  describe('FILTER_CHANGE action', () => {
    it('should set filter value to payload', () => {
      const payload: FilterChangeEvent = {
        smth: 'test'
      };
      const action = new FilterChange(payload);
      const { filter } = usersReducer(initialState, action);

      expect(filter).toEqual({
        role: [Roles.MANAGER, Roles.ADMIN],
        ...payload
      });
    });
  });

  describe('SORTING_CHANGE Action', () => {
    it('should set sorting value to payload', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };
      const action = new SortingChange(payload);
      const { order } = usersReducer(initialState, action);

      expect(order).toEqual(payload);
    });
  });

  describe('PAGE_CHANGE Action', () => {
    it('should set paging value to payload', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 10 };
      const action = new PageChange(payload);
      const { pagination } = usersReducer(initialState, action);
      expect(pagination).toEqual(payload);
    });
  });
});
