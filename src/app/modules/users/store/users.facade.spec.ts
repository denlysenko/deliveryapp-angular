import { async, TestBed } from '@angular/core/testing';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Store, StoreModule } from '@ngrx/store';

import { User } from '../models';
import { FilterChange, PageChange, SelectUser, SortingChange } from './actions';
import { usersReducer, UsersState } from './reducers';
import { UsersFacade } from './users.facade';

// tslint:disable-next-line:no-big-function
describe('UsersFacade', () => {
  let store: Store<UsersState>;
  let facade: UsersFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          users: usersReducer
        })
      ],
      providers: [UsersFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    facade = TestBed.get(UsersFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('current$', () => {
    it('should return current$', () => {
      let result;
      const payload: User = {
        email: 'new_user@test.com'
      };

      facade.current$.subscribe(value => {
        result = value;
      });

      store.dispatch(new SelectUser(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('filter$', () => {
    it('should return current filter$', () => {
      let result;
      const payload: FilterChangeEvent = {
        'filter[smth]': 'test'
      };

      facade.filter$.subscribe(value => {
        result = value;
      });

      store.dispatch(new FilterChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('sorting$', () => {
    it('should return current sorting$', () => {
      let result;
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };

      facade.sorting$.subscribe(value => {
        result = value;
      });

      store.dispatch(new SortingChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('pagination$', () => {
    it('should return current pagination$', () => {
      let result;
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.pagination$.subscribe(value => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('allFilters$', () => {
    it('should return current allFilters$', () => {
      let result;
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      facade.allFilters$.subscribe(value => {
        result = value;
      });

      store.dispatch(new PageChange(payload));
      expect(result).toEqual({
        'filter[role][0]': Roles.MANAGER.toString(),
        'filter[role][1]': Roles.ADMIN.toString(),
        'order[id]': 'asc',
        offset: 10,
        limit: 10
      });
    });
  });

  describe('doFiltering()', () => {
    it('should dispatch a FilterChange action', () => {
      const payload: FilterChangeEvent = {
        'filter[smth]': 'filter'
      };
      const action = new FilterChange(payload);

      facade.doFiltering(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('sort()', () => {
    it('should dispatch a SortingChange action', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
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

  describe('select()', () => {
    it('should dispatch a SelectPayment action', () => {
      const payload: User = {
        email: 'new_user@test.com'
      };

      const action = new SelectUser(payload);

      facade.select(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
