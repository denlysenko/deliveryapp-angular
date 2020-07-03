import { TestBed } from '@angular/core/testing';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { User, UsersFilter } from '../../models';
import {
  FilterChange,
  PageChange,
  SelectUser,
  SortingChange
} from '../actions';
import { usersReducer, UsersState } from '../reducers';
import {
  getAllFilters,
  getCurrent,
  getFilter,
  getPagination,
  getSorting
} from './users.selectors';

describe('Users Selectors', () => {
  let store: Store<UsersState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            users: usersReducer
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

  describe('getCurrent', () => {
    it('should return current payment', () => {
      const payload: User = {
        email: 'new_user@test.com'
      };

      let result: User;

      store.select(getCurrent).subscribe((value) => {
        result = value;
      });

      store.dispatch(new SelectUser(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getFilter', () => {
    it('should return filter value', () => {
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      let result: UsersFilter['filter'];

      store.select(getFilter).subscribe((value) => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual({
        role: [Roles.MANAGER, Roles.ADMIN],
        ...payload
      });
    });
  });

  describe('getSorting', () => {
    it('should return sorting value', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };

      let result: UsersFilter['order'];

      store.select(getSorting).subscribe((value) => {
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

      let result: PageChangeEvent;

      store.select(getPagination).subscribe((value) => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('getAllFilters', () => {
    it('should return combined filter value', () => {
      const payload: FilterChangeEvent = {
        smth: 'test'
      };

      let result: UsersFilter;

      store.select(getAllFilters).subscribe((value) => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual({
        filter: {
          role: [Roles.MANAGER, Roles.ADMIN],
          smth: 'test'
        },
        order: {
          id: 'desc'
        },
        offset: 0,
        limit: 10
      });
    });
  });
});
