import { async, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Order, OrdersFilter } from '../models';
import {
  CreateOrder,
  CreateOrderFail,
  FilterChange,
  PageChange,
  SortingChange,
  UpdateOrder
} from './actions';
import { OrdersFacade } from './orders.facade';
import { ordersReducer, OrdersState } from './reducers';

// tslint:disable-next-line:no-big-function
describe('OrdersFacade', () => {
  let store: Store<OrdersState>;
  let facade: OrdersFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            orders: ordersReducer
          },
          {
            runtimeChecks: {
              strictStateImmutability: false
            }
          }
        )
      ],
      providers: [OrdersFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    facade = TestBed.inject(OrdersFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('loading$', () => {
    it('should return current loading$', () => {
      let result: boolean;
      const payload: Order = {
        cityFrom: 'test',
        cityTo: 'test',
        addressFrom: 'test',
        addressTo: 'test',
        cargoName: 'test',
        cargoWeight: 1,
        senderEmail: 'test@test.com',
        senderPhone: '1232123'
      };

      facade.loading$.subscribe((value) => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new CreateOrder(payload));
      expect(result).toEqual(true);
    });
  });

  describe('error$', () => {
    it('should return current error$', () => {
      let result: any;
      const payload: any = {
        message: 'error'
      };

      facade.error$.subscribe((value) => {
        result = value;
      });

      expect(result).toEqual(null);
      store.dispatch(new CreateOrderFail(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('filter$', () => {
    it('should return current filter$', () => {
      let result: OrdersFilter['filter'];
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
      let result: OrdersFilter['order'];
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
      let result: PageChangeEvent;
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
      let result: OrdersFilter;
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
          id: 'desc'
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

  describe('create()', () => {
    it('should dispatch a CreateOrder action', () => {
      const payload: Order = {
        cityFrom: 'test',
        cityTo: 'test',
        addressFrom: 'test',
        addressTo: 'test',
        cargoName: 'test',
        cargoWeight: 1,
        senderEmail: 'test@test.com',
        senderPhone: '1232123'
      };

      const action = new CreateOrder(payload);

      facade.create(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('update()', () => {
    it('should dispatch a UpdateOrder action', () => {
      const payload: Order = {
        cityFrom: 'test',
        cityTo: 'test',
        addressFrom: 'test',
        addressTo: 'test',
        cargoName: 'test',
        cargoWeight: 1,
        senderEmail: 'test@test.com',
        senderPhone: '1232123'
      };

      const action = new UpdateOrder(payload);

      facade.update(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
