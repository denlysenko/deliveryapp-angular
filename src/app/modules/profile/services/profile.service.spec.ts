import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { User } from '@users/models';

import { environment } from '~/environments/environment';

import { PasswordPayload } from '../models';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });
  });

  describe('updateProfile()', () => {
    it('should update profile', inject(
      [ProfileService],
      fakeAsync((profileService: ProfileService) => {
        const http = TestBed.inject(HttpTestingController);
        const payload: User = {
          email: 'test@test.com',
          phone: '1234'
        };

        profileService.updateProfile(payload).subscribe((res) => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/users/self`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual(payload);
        req.flush(payload);

        tick();
      })
    ));

    it('should return error if update failed', inject(
      [ProfileService],
      fakeAsync((profileService: ProfileService) => {
        const http = TestBed.inject(HttpTestingController);
        const error = {
          message: 'INVALID_PASSWORD_ERR'
        };

        profileService
          .updateProfile({
            email: 'test@example.com',
            phone: '111'
          })
          .subscribe(
            () => {},
            (err) => {
              expect(err.status).toEqual(422);
              expect(err.error).toEqual(error);
            }
          );

        const req = http.expectOne(`${environment.apiUrl}/users/self`);
        expect(req.request.method).toBe('PATCH');
        req.flush({ error: error, status: 422 }, { statusText: 'Error' });

        tick();
      })
    ));
  });

  describe('updatePassword()', () => {
    it('should update password', inject(
      [ProfileService],
      fakeAsync((profileService: ProfileService) => {
        const http = TestBed.inject(HttpTestingController);
        const payload: PasswordPayload = {
          oldPassword: 'password',
          newPassword: '1234'
        };

        profileService.updatePassword(payload).subscribe((res) => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/users/self/password`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual(payload);
        req.flush(payload);

        tick();
      })
    ));

    it('should return error if update failed', inject(
      [ProfileService],
      fakeAsync((profileService: ProfileService) => {
        const http = TestBed.inject(HttpTestingController);
        const error = {
          message: 'INVALID_PASSWORD_ERR'
        };

        profileService
          .updatePassword({
            oldPassword: 'password',
            newPassword: '111'
          })
          .subscribe(
            () => {},
            (err) => {
              expect(err.status).toEqual(400);
              expect(err.error).toEqual(error);
            }
          );

        const req = http.expectOne(`${environment.apiUrl}/users/self/password`);
        expect(req.request.method).toBe('PATCH');
        req.flush({ error: error, status: 400 }, { statusText: 'Error' });

        tick();
      })
    ));
  });
});
