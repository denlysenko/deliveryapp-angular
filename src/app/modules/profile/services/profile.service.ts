import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';

import { User } from '@users/models';

import { Observable } from 'rxjs';

import { PasswordPayload } from '../models';

@Injectable()
export class ProfileService {
  constructor(private apiService: ApiService) {}

  updateProfile(profile: User): Observable<User> {
    return this.apiService.patch('/users/self', profile);
  }

  updatePassword(passwordPayload: PasswordPayload): Observable<void> {
    return this.apiService.patch('/users/self/password', passwordPayload);
  }
}
