import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/primeng';
import { UsersFilterComponent } from './users-filter.component';

describe('UsersFilterComponent', () => {
  let component: UsersFilterComponent;
  let fixture: ComponentFixture<UsersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DropdownModule],
      declarations: [UsersFilterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFilterComponent);
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
      'filter[role][0]': '1',
      'filter[role][1]': '2',
      'filter[id]': '2'
    };
    component.ngOnInit();
    expect(component.form.get('search').value).toEqual('2');
    expect(component.form.get('selectedFilter').value).toEqual('filter[id]');
  });

  it('should emit filterChanged event', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');
    const formValue = {
      selectedFilter: 'filter[email]',
      search: 'test'
    };

    component.form.setValue(formValue);
    tick(500);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      'filter[email]': 'test'
    });
  }));
});
