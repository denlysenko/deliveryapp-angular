import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Roles } from '@common/enums';
import { CoreFacade } from '@core/store';

import { of } from 'rxjs';

import { Order } from '../../../models';
import { OrdersFacade } from '../../../store';
import { UpdateOrderPageComponent } from './update-order-page.component';

const activatedRouteStub = {
  data: of({ order: {} })
};

const ordersFacadeStub = {
  loading$: of(false),
  error$: of({}),
  update: jest.fn()
};

const coreFacadeStub = {
  role$: of(Roles.CLIENT)
};

describe('UpdateOrderPageComponent', () => {
  let component: UpdateOrderPageComponent;
  let fixture: ComponentFixture<UpdateOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrderPageComponent],
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
    fixture = TestBed.createComponent(UpdateOrderPageComponent);
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

  describe('update()', () => {
    it('should call OrdersFacade.update()', () => {
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
      const ordersFacade: OrdersFacade = TestBed.inject(OrdersFacade);

      component.save(payload);

      expect(ordersFacade.update).toHaveBeenCalledWith(payload);
    });
  });
});
