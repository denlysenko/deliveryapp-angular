import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    component.sorting = {
      id: 'asc'
    };
    component.pagination = {
      limit: 10,
      offset: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct sortField and sortOrder properties', () => {
    expect(component.sortField).toBe('id');
    expect(component.sortOrder).toBe(1);
  });

  describe('sort()', () => {
    it('should emit sortingChanged event', () => {
      spyOn(component.sortingChanged, 'emit');

      component.sort({
        field: 'id',
        order: -1
      });

      expect(component.sortingChanged.emit).toHaveBeenCalledWith({
        id: 'desc'
      });
    });
  });

  describe('paginate()', () => {
    it('should emit paginationChanged event', () => {
      spyOn(component.paginationChanged, 'emit');

      component.paginate({
        rows: 10,
        page: 2
      });

      expect(component.paginationChanged.emit).toHaveBeenCalledWith({
        limit: 10,
        offset: 20
      });
    });
  });
});
