import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { User } from '@auth/models';
import { ApiService } from '@core/services/api.service';
import { environment } from '~/environments/environment';

import { UserSelfService } from './user-self.service';

describe('UserSelfService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserSelfService, ApiService]
    })
  );

  it('should be created', () => {
    const service: UserSelfService = TestBed.get(UserSelfService);
    expect(service).toBeTruthy();
  });

  describe('loadSelf', () => {
    it('should return logged user', inject(
      [UserSelfService],
      fakeAsync(service => {
        const http = TestBed.get(HttpTestingController);
        const userResponse: User = {
          id: 1,
          email: 'test@test.com',
          firstName: 'First Name',
          lastName: 'Last Name',
          company: 'Company',
          phone: '1(111) 111-11-11',
          role: 1
        };

        service.loadSelf().subscribe(res => {
          expect(res).toEqual(userResponse);
        });

        const req = http.expectOne(`${environment.apiUrl}/users/self`);
        expect(req.request.method).toBe('GET');
        req.flush(userResponse);

        tick();
      })
    ));

    it('should return error if load user failed', inject(
      [UserSelfService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        const userError = {
          message: 'Error'
        };

        authService.loadSelf().subscribe(
          () => {},
          err => {
            expect(err.status).toEqual(401);
            expect(err.error).toEqual(userError);
          }
        );

        const req = http.expectOne(`${environment.apiUrl}/users/self`);
        expect(req.request.method).toBe('GET');
        req.error(new HttpErrorResponse({ error: userError, status: 401 }));

        tick();
      })
    ));
  });

  describe('loadMessages', () => {
    it('should return messages', inject(
      [UserSelfService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        // TODO add Message type
        const messageResponse: any = {
          _id: '1',
          text: 'message',
          read: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        };

        authService.loadMessages().subscribe(res => {
          expect(res).toEqual(messageResponse);
        });

        const req = http.expectOne(`${environment.apiUrl}/users/self/messages`);
        expect(req.request.method).toBe('GET');
        req.flush(messageResponse);

        tick();
      })
    ));

    it('should return error if load messages failed', inject(
      [UserSelfService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        const userError = {
          message: 'Error'
        };

        authService.loadMessages().subscribe(
          () => {},
          err => {
            expect(err.status).toEqual(401);
            expect(err.error).toEqual(userError);
          }
        );

        const req = http.expectOne(`${environment.apiUrl}/users/self/messages`);
        expect(req.request.method).toBe('GET');
        req.error(new HttpErrorResponse({ error: userError, status: 401 }));

        tick();
      })
    ));
  });
});
