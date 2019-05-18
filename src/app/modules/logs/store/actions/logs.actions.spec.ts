import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import {
  FilterChange,
  LogsActionTypes,
  PageChange,
  SortingChange
} from './logs.actions';

describe('Logs Actions', () => {
  describe('FilterChange', () => {
    it('should create an action', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      const action = new FilterChange(payload);
      expect({ ...action }).toEqual({
        type: LogsActionTypes.FILTER_CHANGE,
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
        type: LogsActionTypes.SORTING_CHANGE,
        payload
      });
    });
  });

  describe('PageChange', () => {
    it('should create an action', () => {
      const payload: PageChangeEvent = { limit: 10, offset: 0 };

      const action = new PageChange(payload);
      expect({ ...action }).toEqual({
        type: LogsActionTypes.PAGE_CHANGE,
        payload
      });
    });
  });
});
