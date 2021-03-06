import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

import { OrdersFilterComponent } from './orders-filter.component';

describe('OrdersFilterComponent', () => {
  let component: OrdersFilterComponent;
  let fixture: ComponentFixture<OrdersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DropdownModule],
      declarations: [OrdersFilterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFilterComponent);
    component = fixture.componentInstance;
    component.filter = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have options defined', () => {
    expect(component.options).toBeDefined();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
  });

  it('should init form with filter value', () => {
    component.filter = {
      cargoName: 'test'
    };
    component.ngOnInit();
    expect(component.form.get('search').value).toEqual('test');
    expect(component.form.get('selectedFilter').value).toEqual('cargoName');
  });

  it('should emit filterChanged event', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');
    const formValue = {
      selectedFilter: 'cargoName',
      search: 'test'
    };

    component.form.setValue(formValue);
    tick(500);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      cargoName: 'test'
    });
  }));
});
