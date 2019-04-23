import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Roles } from '@common/enums';
import { CoreFacade } from '@core/store';

import { of } from 'rxjs';

import { Order } from '../../../models';
import { OrdersFacade } from '../../../store';
import { CreateOrderPageComponent } from './create-order-page.component';

const activatedRouteStub = {
  data: of({
    clients: {
      count: 1,
      rows: [
        {
          id: 1
        }
      ]
    }
  })
};

const ordersFacadeStub = {
  loading$: of(false),
  error$: of({}),
  create: jest.fn()
};

const coreFacadeStub = {
  role$: of(Roles.CLIENT)
};

describe('CreateOrderPageComponent', () => {
  let component: CreateOrderPageComponent;
  let fixture: ComponentFixture<CreateOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrderPageComponent],
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
    fixture = TestBed.createComponent(CreateOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `loading$` defined', () => {
    expect(component.loading$).toBeDefined();
  });

  it('should have `error$` defined', () => {
    expect(component.error$).toBeDefined();
  });

  it('should have `role$` defined', () => {
    expect(component.role$).toBeDefined();
  });

  describe('create()', () => {
    it('should call OrdersFacade.create()', () => {
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
      const ordersFacade: OrdersFacade = TestBed.get(OrdersFacade);

      component.create(payload);

      expect(ordersFacade.create).toHaveBeenCalledWith(payload);
    });
  });
});
