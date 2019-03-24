import { Injectable } from '@angular/core';

import { User } from '@auth/models';

import { ApiService } from '@core/services/api.service';

import { Observable } from 'rxjs';

import { PasswordPayload } from '../models';

@Injectable()
export class ProfileService {
  constructor(private apiService: ApiService) {}

  updateProfile(profile: User): Observable<User> {
    return this.apiService.post('/users/self', profile);
  }

  updatePassword(passwordPayload: PasswordPayload): Observable<void> {
    return this.apiService.post('/users/self/password', passwordPayload);
  }
}
