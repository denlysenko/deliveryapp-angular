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

import { LogsFilterComponent } from './logs-filter.component';

describe('LogsFilterComponent', () => {
  let component: LogsFilterComponent;
  let fixture: ComponentFixture<LogsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DropdownModule],
      declarations: [LogsFilterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsFilterComponent);
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
      'filter[action]': '2'
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
      'filter[action]': '1'
    });
  }));
});
