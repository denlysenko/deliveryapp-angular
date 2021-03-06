import { async, TestBed } from '@angular/core/testing';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { LogsFilter } from '../models';
import { FilterChange, PageChange, SortingChange } from './actions';
import { LogsFacade } from './logs.facade';
import { logsReducer, LogsState } from './reducers';

describe('LogsFacade', () => {
  let store: Store<LogsState>;
  let facade: LogsFacade;

  beforeEach(async(() => {
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
      ],
      providers: [LogsFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    facade = TestBed.inject(LogsFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('filter$', () => {
    it('should return current filter$', () => {
      let result: LogsFilter['filter'];
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      facade.filter$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('sorting$', () => {
    it('should return current sorting$', () => {
      let result: LogsFilter['order'];
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };

      facade.sorting$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new SortingChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('pagination$', () => {
    it('should return current pagination$', () => {
      let result: { limit: number; offset: number };
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.pagination$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('allFilters$', () => {
    it('should return current allFilters$', () => {
      let result: LogsFilter;
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.allFilters$.subscribe((value) => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual({
        filter: {},
        order: {
          createdAt: 'desc'
        },
        offset: 10,
        limit: 10
      });
    });
  });

  describe('doFiltering()', () => {
    it('should dispatch a FilterChange action', () => {
      const payload: FilterChangeEvent = {
        smth: 'filter'
      };
      const action = new FilterChange(payload);

      facade.doFiltering(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('sort()', () => {
    it('should dispatch a SortingChange action', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };
      const action = new SortingChange(payload);

      facade.sort(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('paginate()', () => {
    it('should dispatch a PageChange action', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };
      const action = new PageChange(payload);

      facade.paginate(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
