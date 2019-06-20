import { TestBed } from '@angular/core/testing';

import { UsersService } from '@users/services/users.service';

import { DialogService } from 'primeng/api';

import { of } from 'rxjs';

import { UserViewService } from './user-view.service';

const USER_ID = 1;

describe('UserViewService', () => {
  let service: UserViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserViewService,
        {
          provide: UsersService,
          useValue: {
            getById: jest.fn().mockReturnValue(
              of({
                email: 'test@test.com'
              })
            )
          }
        },
        {
          provide: DialogService,
          useValue: {
            open: jest.fn()
          }
        }
      ]
    });

    service = TestBed.get(UserViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open()', () => {
    beforeEach(() => {
      service.show(USER_ID);
    });

    it('should get user by id', () => {
      const usersService: UsersService = TestBed.get(UsersService);
      expect(usersService.getById).toBeCalledWith(USER_ID);
    });

    it('should open dialog', () => {
      const dialogService: DialogService = TestBed.get(DialogService);
      expect(dialogService.open).toBeCalled();
    });
  });
});
