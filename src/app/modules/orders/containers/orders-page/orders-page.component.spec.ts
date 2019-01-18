import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { Roles } from '@common/enums';
import { PageChangeEvent, SortingChangeEvent } from '@common/models';
import { CoreFacade } from '@core/store';

import { OrdersFacade } from '../../store';
import { OrdersPageComponent } from './orders-page.component';

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
  sort: jasmine.createSpy('sort'),
  paginate: jasmine.createSpy('jasmine')
};

const coreFacadeStub = {
  role$: of(Roles.CLIENT)
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
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  describe('sort()', () => {
    it('should call OrdersFacade.sort()', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };
      const ordersFacade: OrdersFacade = TestBed.get(OrdersFacade);

      component.sort(payload);
      expect(ordersFacade.sort).toHaveBeenCalledWith(payload);
    });
  });

  describe('paginate()', () => {
    it('should call OrdersFacade.paginate()', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };
      const ordersFacade: OrdersFacade = TestBed.get(OrdersFacade);

      component.paginate(payload);
      expect(ordersFacade.paginate).toHaveBeenCalledWith(payload);
    });
  });
});
