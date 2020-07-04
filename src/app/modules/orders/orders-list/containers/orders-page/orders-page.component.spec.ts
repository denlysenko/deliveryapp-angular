import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { UserViewService } from '@user-view/user-view.service';

import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { Order } from '../../../models';
import { OrdersService } from '../../../services/orders.service';
import { OrdersFacade } from '../../../store';
import { OrdersPageComponent } from './orders-page.component';

const allFilters = new BehaviorSubject({});
const role = new BehaviorSubject(Roles.CLIENT);

const order: Order = {
  cityFrom: 'test',
  cityTo: 'test',
  addressFrom: 'test',
  addressTo: 'test',
  cargoName: 'test',
  cargoWeight: 1,
  senderEmail: 'test@test.com',
  senderPhone: '1232123'
};

const activatedRouteStub = {
  data: of({
    orders: {
      count: 1,
      rows: [
        {
          ...order,
          client: {}
        }
      ]
    }
  })
};

const ordersFacadeStub = {
  filter$: of({}),
  sorting$: of({}),
  pagination$: of({}),
  allFilters$: allFilters.asObservable(),
  sort: jest.fn(),
  paginate: jest.fn(),
  doFiltering: jest.fn()
};

const coreFacadeStub = {
  role$: role.asObservable()
};

const ordersServiceStub = {
  getOrders: jest.fn().mockReturnValue(of({ rows: [order], count: 1 }))
};

const loaderServiceStub = {
  start: jest.fn(),
  stop: jest.fn()
};

const userViewServiceStub = {
  show: jest.fn()
};

describe('OrdersPageComponent', () => {
  let component: OrdersPageComponent;
  let fixture: ComponentFixture<OrdersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: OrdersFacade,
          useValue: ordersFacadeStub
        },
        {
          provide: CoreFacade,
          useValue: coreFacadeStub
        },
        {
          provide: OrdersService,
          useValue: ordersServiceStub
        },
        {
          provide: LoaderService,
          useValue: loaderServiceStub
        },
        {
          provide: UserViewService,
          useValue: userViewServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `filter$` defined', () => {
    expect(component.filter$).toBeDefined();
  });

  it('should have `sorting$` defined', () => {
    expect(component.sorting$).toBeDefined();
  });

  it('should have `pagination$` defined', () => {
    expect(component.pagination$).toBeDefined();
  });

  it('should have `role$` defined', () => {
    expect(component.role$).toBeDefined();
  });

  it('should have orders from activatedRoute', (done) => {
    component.data$.pipe(take(1)).subscribe((data) => {
      expect(data.rows).toEqual([
        {
          ...order,
          client: {}
        }
      ]);
      expect(data.count).toEqual(1);
      done();
    });
  });

  describe('handleFilterChange()', () => {
    it('should call OrdersFacade.doFiltering()', () => {
      const payload: FilterChangeEvent = {
        smth: 'desc'
      };
      const ordersFacade: OrdersFacade = TestBed.inject(OrdersFacade);

      component.handleFilterChange(payload);
      expect(ordersFacade.doFiltering).toHaveBeenCalledWith(payload);
    });
  });

  describe('handleSortingChange()', () => {
    it('should call OrdersFacade.sort()', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };
      const ordersFacade: OrdersFacade = TestBed.inject(OrdersFacade);

      component.handleSortingChange(payload);
      expect(ordersFacade.sort).toHaveBeenCalledWith(payload);
    });
  });

  describe('handlePageChange()', () => {
    it('should call OrdersFacade.paginate()', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };
      const ordersFacade: OrdersFacade = TestBed.inject(OrdersFacade);

      component.handlePageChange(payload);
      expect(ordersFacade.paginate).toHaveBeenCalledWith(payload);
    });
  });

  describe('all filters changes', () => {
    const filter = {
      limit: 10,
      offset: 10
    };

    it('should start loader', () => {
      const loaderService: LoaderService = TestBed.inject(LoaderService);

      allFilters.next({
        limit: 10,
        offset: 10
      });
      expect(loaderService.start).toHaveBeenCalled();
    });

    it('should call getOrders()', () => {
      const ordersService: OrdersService = TestBed.inject(OrdersService);

      allFilters.next(filter);
      expect(ordersService.getOrders).toHaveBeenCalledWith(filter);
    });

    it('should stop loader', () => {
      const loaderService: LoaderService = TestBed.inject(LoaderService);

      allFilters.next(filter);
      expect(loaderService.stop).toHaveBeenCalled();
    });
  });

  describe('showUser()', () => {
    it('should call userViewService.show()', () => {
      const userViewService: UserViewService = TestBed.inject(UserViewService);
      const userId = 1;

      component.showUser(userId);

      expect(userViewService.show).toHaveBeenCalledWith(userId);
    });
  });
});
