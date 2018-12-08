import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '@core/services/api.service';

import { AuthForm, AuthPayload } from '../models';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(creds: AuthForm): Observable<AuthPayload> {
    return this.apiService.post('/auth/login', creds);
  }

  register(creds: AuthForm): Observable<AuthPayload> {
    return this.apiService.post('/auth/register', creds);
  }
}
