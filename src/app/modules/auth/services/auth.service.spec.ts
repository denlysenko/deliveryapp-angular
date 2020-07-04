import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '@core/services/api.service';

import { environment } from '~/environments/environment';

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
      fakeAsync((authService: AuthService) => {
        const http = TestBed.inject(HttpTestingController);
        const loginResponse = { token: 'JWT token' };
        const body = {
          email: 'test@example.com',
          password: '111'
        };

        authService.login(body).subscribe((res) => {
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
      fakeAsync((authService: AuthService) => {
        const http = TestBed.inject(HttpTestingController);
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
            (err) => {
              console.log(err);
              expect(err.status).toEqual(401);
              expect(err.error).toEqual(loginError);
            }
          );

        const req = http.expectOne(`${environment.apiUrl}/auth/login`);
        expect(req.request.method).toBe('POST');
        req.flush({ error: loginError, status: 401 }, { statusText: 'Error' });

        tick();
      })
    ));
  });

  describe('register()', () => {
    it('should register new user', inject(
      [AuthService],
      fakeAsync((authService: AuthService) => {
        const http = TestBed.inject(HttpTestingController);
        const loginResponse = { token: 'JWT token' };
        const body = {
          email: 'test@example.com',
          password: '111'
        };

        authService.register(body).subscribe((res) => {
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
      fakeAsync((authService: AuthService) => {
        const http = TestBed.inject(HttpTestingController);
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
            (err) => {
              expect(err.status).toEqual(422);
              expect(err.error).toEqual(registerError);
            }
          );

        const req = http.expectOne(`${environment.apiUrl}/auth/register`);
        expect(req.request.method).toBe('POST');
        req.flush(
          { error: registerError, status: 422 },
          { statusText: 'Error' }
        );

        tick();
      })
    ));
  });
});
