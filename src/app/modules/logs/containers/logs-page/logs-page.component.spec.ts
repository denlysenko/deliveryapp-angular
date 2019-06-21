import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Actions } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LoaderService } from '@core/services';

import { UserViewService } from '@user-view/user-view.service';

import { BehaviorSubject, of } from 'rxjs';

import { Log } from '../../models';
import { LogsService } from '../../services/logs.service';
import { LogsFacade } from '../../store';
import { LogsPageComponent } from './logs-page.component';

const allFilters = new BehaviorSubject(null);

const log: Log = {
  action: Actions.AUTHENTICATION,
  userId: 1,
  createdAt: ''
};

const activatedRouteStub = {
  snapshot: {
    data: {
      logs: {
        count: 1,
        rows: [{}]
      }
    }
  }
};

const logsFacadeStub = {
  filter$: of({}),
  sorting$: of({}),
  pagination$: of({}),
  allFilters$: allFilters.asObservable(),
  sort: jest.fn(),
  paginate: jest.fn(),
  doFiltering: jest.fn()
};

const logsServiceStub = {
  getLogs: jest.fn().mockReturnValue(of({ rows: [log], count: 1 }))
};

const loaderServiceStub = {
  start: jest.fn(),
  stop: jest.fn()
};

const userViewServiceStub = {
  show: jest.fn()
};

describe('LogsPageComponent', () => {
  let component: LogsPageComponent;
  let fixture: ComponentFixture<LogsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogsPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: LogsFacade,
          useValue: logsFacadeStub
        },
        {
          provide: LogsService,
          useValue: logsServiceStub
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
    fixture = TestBed.createComponent(LogsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    allFilters.next({});
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

  describe('OnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should have orders from activatedRoute', () => {
      expect(component.logs).toEqual(
        activatedRouteStub.snapshot.data.logs.rows
      );
    });

    it('should have count from activatedRoute', () => {
      expect(component.count).toEqual(
        activatedRouteStub.snapshot.data.logs.count
      );
    });
  });

  describe('handleFilterChange()', () => {
    it('should call LogsFacade.doFiltering()', () => {
      const payload: FilterChangeEvent = {
        'order[smth]': 'desc'
      };
      const logsFacade: LogsFacade = TestBed.get(LogsFacade);

      component.handleFilterChange(payload);
      expect(logsFacade.doFiltering).toHaveBeenCalledWith(payload);
    });
  });

  describe('handleSortingChange()', () => {
    it('should call LogsFacade.sort()', () => {
      const payload: SortingChangeEvent = {
        'order[smth]': 'desc'
      };
      const logsFacade: LogsFacade = TestBed.get(LogsFacade);

      component.handleSortingChange(payload);
      expect(logsFacade.sort).toHaveBeenCalledWith(payload);
    });
  });

  describe('handlePageChange()', () => {
    it('should call OrdersFacade.paginate()', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };
      const logsFacade: LogsFacade = TestBed.get(LogsFacade);

      component.handlePageChange(payload);
      expect(logsFacade.paginate).toHaveBeenCalledWith(payload);
    });
  });

  describe('all filters changes', () => {
    const filter = {
      limit: 10,
      offset: 10
    };

    it('should start loader', () => {
      const loaderService: LoaderService = TestBed.get(LoaderService);

      allFilters.next({
        limit: 10,
        offset: 10
      });
      expect(loaderService.start).toHaveBeenCalled();
    });

    it('should call getLogs()', () => {
      const logsService: LogsService = TestBed.get(LogsService);

      allFilters.next(filter);
      expect(logsService.getLogs).toHaveBeenCalledWith(filter);
    });

    it('should stop loader', () => {
      const loaderService: LoaderService = TestBed.get(LoaderService);

      allFilters.next(filter);
      expect(loaderService.stop).toHaveBeenCalled();
    });

    it('should save new orders and count', () => {
      allFilters.next(filter);

      expect(component.logs).toEqual([log]);
      expect(component.count).toEqual(1);
    });
  });

  describe('showUser()', () => {
    it('should call userViewService.show()', () => {
      const userViewService: UserViewService = TestBed.get(UserViewService);
      const userId = 1;

      component.showUser(userId);

      expect(userViewService.show).toHaveBeenCalledWith(userId);
    });
  });
});
