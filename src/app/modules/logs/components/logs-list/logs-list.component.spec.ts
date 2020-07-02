import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsListComponent } from './logs-list.component';

describe('LogsListComponent', () => {
  let component: LogsListComponent;
  let fixture: ComponentFixture<LogsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogsListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsListComponent);
    component = fixture.componentInstance;
    component.sorting = {
      createdAt: 'asc'
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
    expect(component.sortField).toBe('createdAt');
    expect(component.sortOrder).toBe(1);
  });

  describe('sort()', () => {
    it('should emit sortingChanged event', () => {
      spyOn(component.sortingChanged, 'emit');

      component.sort({
        field: 'createdAt',
        order: -1
      });

      expect(component.sortingChanged.emit).toHaveBeenCalledWith({
        createdAt: 'desc'
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
