import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { FilterChange, PageChange, SortingChange } from '../actions';
import { initialState, logsReducer } from './logs.reducer';

describe('LogsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = logsReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('FILTER_CHANGE action', () => {
    it('should set filter value to payload', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };
      const action = new FilterChange(payload);
      const { filter } = logsReducer(initialState, action);

      expect(filter).toEqual(payload);
    });
  });

  describe('SORTING_CHANGE Action', () => {
    it('should set sorting value to payload', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };
      const action = new SortingChange(payload);
      const { sorting } = logsReducer(initialState, action);

      expect(sorting).toEqual(payload);
    });
  });

  describe('PAGE_CHANGE Action', () => {
    it('should set paging value to payload', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 10 };
      const action = new PageChange(payload);
      const { pagination } = logsReducer(initialState, action);
      expect(pagination).toEqual(payload);
    });
  });
});
