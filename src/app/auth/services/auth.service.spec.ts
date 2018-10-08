import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '@core/services/api.service';
import { environment } from '~/environments/environment';

import { User } from '../models';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, ApiService]
    });
  });

  describe('login()', () => {
    it('should log in existing user', inject(
      [AuthService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        const loginResponse = { token: 'JWT token' };
        const body = {
          email: 'test@example.com',
          password: '111'
        };

        authService.login(body).subscribe(res => {
          expect(res).toEqual(loginResponse);
        });

        const req = http.expectOne(`${environment.apiUrl}/auth/login`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(body);
        req.flush(loginResponse);

        tick();
      })
    ));

    it('should return error if login failed', inject(
      [AuthService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        const loginError = {
          message: 'INVALID_PASSWORD_ERR',
          fields: ['password']
        };

        authService
          .login({
            email: 'test@example.com',
            password: '111'
          })
          .subscribe(
            () => {},
            err => {
              expect(err.status).toEqual(401);
              expect(err.error).toEqual(loginError);
            }
          );

        const req = http.expectOne(`${environment.apiUrl}/auth/login`);
        expect(req.request.method).toBe('POST');
        req.error(new HttpErrorResponse({ error: loginError, status: 401 }));

        tick();
      })
    ));
  });

  describe('register()', () => {
    it('should register new user', inject(
      [AuthService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        const loginResponse = { token: 'JWT token' };
        const body = {
          email: 'test@example.com',
          password: '111'
        };

        authService.register(body).subscribe(res => {
          expect(res).toEqual(loginResponse);
        });

        const req = http.expectOne(`${environment.apiUrl}/auth/register`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(body);
        req.flush(loginResponse);

        tick();
      })
    ));

    it('should return error if registration failed', inject(
      [AuthService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        const registerError = {
          name: 'SequelizeValidationError',
          errors: [
            {
              message: 'UNIQUE_EMAIL_ERR',
              type: 'unique violation',
              path: 'email',
              value: 'test@test.com',
              origin: 'DB',
              validatorKey: 'not_unique',
              validatorName: null,
              validatorArgs: []
            }
          ]
        };

        authService
          .register({
            email: 'test@example.com',
            password: '111'
          })
          .subscribe(
            () => {},
            err => {
              expect(err.status).toEqual(422);
              expect(err.error).toEqual(registerError);
            }
          );

        const req = http.expectOne(`${environment.apiUrl}/auth/register`);
        expect(req.request.method).toBe('POST');
        req.error(new HttpErrorResponse({ error: registerError, status: 422 }));

        tick();
      })
    ));
  });

  describe('loadLoggedUser', () => {
    it('should return logged user', inject(
      [AuthService],
      fakeAsync(authService => {
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

        authService.loadLoggedUser().subscribe(res => {
          expect(res).toEqual(userResponse);
        });

        const req = http.expectOne(`${environment.apiUrl}/users/self`);
        expect(req.request.method).toBe('GET');
        req.flush(userResponse);

        tick();
      })
    ));

    it('should return error if load user failed', inject(
      [AuthService],
      fakeAsync(authService => {
        const http = TestBed.get(HttpTestingController);
        const userError = {
          message: 'Error'
        };

        authService.loadLoggedUser().subscribe(
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
      [AuthService],
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
      [AuthService],
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
