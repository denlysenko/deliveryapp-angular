import { TestBed } from '@angular/core/testing';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { FilterChange, PageChange, SortingChange } from '../actions';
import { logsReducer, LogsState } from '../reducers';
import {
  getAllFilters,
  getFilter,
  getPagination,
  getSorting
} from './logs.selectors';

describe('Logs Selectors', () => {
  let store: Store<LogsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            logs: logsReducer
          },
          {
            runtimeChecks: {
              strictStateImmutability: false
            }
          }
        )
      ]
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getFilter', () => {
    it('should return filter value', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      let result;

      store.select(getFilter).subscribe(value => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getSorting', () => {
    it('should return sorting value', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };

      let result;

      store.select(getSorting).subscribe(value => {
        result = value;
      });

      store.dispatch(new SortingChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getPagination', () => {
    it('should return pagination value', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      let result;

      store.select(getPagination).subscribe(value => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getAllFilters', () => {
    it('should return combined filter value', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      let result;

      store.select(getAllFilters).subscribe(value => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual({
        'filter[smth]': 'test',
        'order[createdAt]': 'desc',
        offset: 0,
        limit: 10
      });
    });
  });
});
