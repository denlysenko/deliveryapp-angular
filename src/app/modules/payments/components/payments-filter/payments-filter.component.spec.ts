import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentsFilterComponent } from './payments-filter.component';

describe('PaymentsFilterComponent', () => {
  let component: PaymentsFilterComponent;
  let fixture: ComponentFixture<PaymentsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PaymentsFilterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsFilterComponent);
    component = fixture.componentInstance;
    component.filter = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
  });

  it('should init form with filter value', () => {
    component.filter = {
      'filter[id]': '2'
    };
    component.ngOnInit();
    expect(component.form.get('search').value).toEqual('2');
  });

  it('should emit filterChanged event', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');
    const formValue = {
      search: '1'
    };

    component.form.setValue(formValue);
    tick(500);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      'filter[id]': '1'
    });
  }));
});
