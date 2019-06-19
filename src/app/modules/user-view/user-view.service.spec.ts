import { TestBed } from '@angular/core/testing';

import { UserViewService } from './user-view.service';

describe('UserViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserViewService = TestBed.get(UserViewService);
    expect(service).toBeTruthy();
  });
});
