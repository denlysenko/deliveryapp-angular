import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of, BehaviorSubject } from 'rxjs';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';
import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { Order } from '../../../models';
import { OrdersService } from '../../../services/orders.service';
import { OrdersFacade } from '../../../store';
import { OrdersPageComponent } from './orders-page.component';
import { UserViewService } from '@user-view/user-view.service';

const allFilters = new BehaviorSubject(null);
const role = new BehaviorSubject(null);

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
  snapshot: {
    data: {
      orders: {
        count: 1,
        rows: [
          {
            client: {}
          }
        ]
      }
    }
  }
};

const ordersFacadeStub = {
  filter$: of({}),
  sorting$: of({}),
  pagination$: of({}),
  allFilters$: allFilters.asObservable(),
  sort: jasmine.createSpy('sort'),
  paginate: jasmine.createSpy('paginate'),
  doFiltering: jasmine.createSpy('doFiltering')
};

const coreFacadeStub = {
  role$: role.asObservable()
};

const ordersServiceStub = {
  getOrdersSelf: jasmine
    .createSpy('getOrdersSelf')
    .and.returnValue(of({ rows: [order], count: 1 })),
  getOrders: jasmine
    .createSpy('getOrders')
    .and.returnValue(of({ rows: [order], count: 1 }))
};

const loaderServiceStub = {
  start: jasmine.createSpy('start'),
  stop: jasmine.createSpy('stop')
};

const userViewServiceStub = {
  show: jasmine.createSpy('show')
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
    allFilters.next({});
    role.next(Roles.CLIENT);
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

  describe('OnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should have orders from activatedRoute', () => {
      expect(component.orders).toEqual(
        activatedRouteStub.snapshot.data.orders.rows
      );
    });

    it('should have count from activatedRoute', () => {
      expect(component.count).toEqual(
        activatedRouteStub.snapshot.data.orders.count
      );
    });
  });

  describe('handleFilterChange()', () => {
    it('should call OrdersFacade.doFiltering()', () => {
      const payload: FilterChangeEvent = {
        'order[smth]': 'desc'
      };
      const ordersFacade: OrdersFacade = TestBed.inject(OrdersFacade);

      component.handleFilterChange(payload);
      expect(ordersFacade.doFiltering).toHaveBeenCalledWith(payload);
    });
  });

  describe('handleSortingChange()', () => {
    it('should call OrdersFacade.sort()', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
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

    beforeEach(() => {
      ordersServiceStub.getOrders.calls.reset();
      ordersServiceStub.getOrdersSelf.calls.reset();
    });

    it('should start loader', () => {
      const loaderService: LoaderService = TestBed.inject(LoaderService);

      allFilters.next({
        limit: 10,
        offset: 10
      });
      expect(loaderService.start).toHaveBeenCalled();
    });

    it('should call getOrdersSelf() for Roles.CLIENT', () => {
      const ordersService: OrdersService = TestBed.inject(OrdersService);

      allFilters.next(filter);
      expect(ordersService.getOrdersSelf).toHaveBeenCalledWith(filter);
    });

    it('should call getOrders() for !Roles.CLIENT', () => {
      const ordersService: OrdersService = TestBed.inject(OrdersService);

      role.next(Roles.MANAGER);
      allFilters.next(filter);
      expect(ordersService.getOrders).toHaveBeenCalledWith(filter);
    });

    it('should stop loader', () => {
      const loaderService: LoaderService = TestBed.inject(LoaderService);

      allFilters.next(filter);
      expect(loaderService.stop).toHaveBeenCalled();
    });

    it('should save new orders and count', () => {
      allFilters.next(filter);

      expect(component.orders).toEqual([order]);
      expect(component.count).toEqual(1);
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
