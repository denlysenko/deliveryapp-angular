import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';

import { BehaviorSubject, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

import { User } from '../../models';
import { UsersService } from '../../services/users.service';
import { UsersFacade } from '../../store';
import { UsersPageComponent } from './users-page.component';

const allFilters = new BehaviorSubject({ limit: 10, offset: 0 });

const user: User = {
  id: 1,
  email: 'test@test.com'
};

const activatedRouteStub = {
  data: of({
    users: {
      count: 1,
      rows: [user]
    }
  })
};

const usersFacadeStub = {
  filter$: of({}),
  sorting$: of({}),
  pagination$: of({}),
  current$: of({}),
  allFilters$: allFilters.asObservable(),
  sort: jest.fn(),
  paginate: jest.fn(),
  doFiltering: jest.fn(),
  select: jest.fn(),
  reload: jest.fn()
};

const usersServiceStub = {
  getUsers: jest.fn().mockReturnValue(of({ rows: [user], count: 1 })),
  updateUser: jest.fn().mockReturnValue(of(user)),
  createUser: jest.fn().mockReturnValue(of(user))
};

const loaderServiceStub = {
  start: jest.fn(),
  stop: jest.fn()
};

const feedbackServiceStub = {
  success: jest.fn()
};

// tslint:disable-next-line:no-big-function
describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;
  let usersFacade: UsersFacade;
  let usersService: UsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: UsersFacade,
          useValue: usersFacadeStub
        },
        {
          provide: UsersService,
          useValue: usersServiceStub
        },
        {
          provide: LoaderService,
          useValue: loaderServiceStub
        },
        {
          provide: FeedbackService,
          useValue: feedbackServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    usersFacade = TestBed.inject(UsersFacade);
    usersService = TestBed.inject(UsersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `current$` defined', () => {
    expect(component.current$).toBeDefined();
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

  it('should have users and count from activatedRoute', (done) => {
    component.data$.pipe(take(1)).subscribe((data) => {
      expect(data.rows).toEqual([user]);
      expect(data.count).toEqual(1);
      done();
    });
  });

  describe('handleFilterChange()', () => {
    it('should call UsersFacade.doFiltering()', () => {
      const payload: FilterChangeEvent = {
        smth: 'desc'
      };

      component.handleFilterChange(payload);
      expect(usersFacade.doFiltering).toHaveBeenCalledWith(payload);
    });
  });

  describe('handleSortingChange()', () => {
    it('should call UsersFacade.sort()', () => {
      const payload: SortingChangeEvent = {
        smth: 'desc'
      };

      component.handleSortingChange(payload);
      expect(usersFacade.sort).toHaveBeenCalledWith(payload);
    });
  });

  describe('handlePageChange()', () => {
    it('should call UsersFacade.paginate()', () => {
      const payload: PageChangeEvent = {
        limit: 10,
        offset: 10
      };

      component.handlePageChange(payload);
      expect(usersFacade.paginate).toHaveBeenCalledWith(payload);
    });
  });

  describe('selectUser()', () => {
    it('should call UsersFacade.select()', () => {
      component.selectUser(user);
      expect(usersFacade.select).toHaveBeenCalledWith(user);
    });
  });

  describe('all filters changes', () => {
    const filter = {
      limit: 10,
      offset: 10
    };

    it('should start loader', () => {
      const loaderService: LoaderService = TestBed.inject(LoaderService);
      allFilters.next(filter);
      expect(loaderService.start).toHaveBeenCalled();
    });

    it('should call getUsers()', () => {
      allFilters.next(filter);
      expect(usersService.getUsers).toHaveBeenCalledWith(filter);
    });

    it('should stop loader', () => {
      const loaderService: LoaderService = TestBed.inject(LoaderService);
      allFilters.next(filter);
      expect(loaderService.stop).toHaveBeenCalled();
    });
  });

  describe('save()', () => {
    beforeEach(() => {
      loaderServiceStub.start.mockClear();
      loaderServiceStub.stop.mockClear();
      usersServiceStub.getUsers.mockClear();
    });

    it('should call updateUser()', () => {
      component.save(user);
      expect(usersService.updateUser).toHaveBeenCalledWith(user);
    });

    it('should call createUser()', () => {
      const { id, ...newUser } = user;
      component.save(newUser);
      expect(usersService.createUser).toHaveBeenCalledWith(newUser);
    });

    it('should show success message', () => {
      const feedbackService: FeedbackService = TestBed.inject(FeedbackService);
      component.save(user);
      expect(feedbackService.success).toHaveBeenCalled();
    });

    it('should send error to error$', () => {
      const error = { message: 'error' };
      // tslint:disable-next-line:no-shadowed-variable
      const usersService: UsersService = TestBed.inject(UsersService);

      usersService.updateUser = jest.fn().mockReturnValue(throwError(error));

      let result: any;

      component.error$.subscribe((err) => {
        result = err;
      });

      component.save(user);
      expect(result).toEqual(error);
    });
  });
});
