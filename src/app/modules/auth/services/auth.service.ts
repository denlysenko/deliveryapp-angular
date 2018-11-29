import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '@core/services/api.service';

import { AuthForm, AuthPayload, User } from '../models';

// import { Message } from '../../lib/messages/Message';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(creds: AuthForm): Observable<AuthPayload> {
    return this.apiService.post('/auth/login', creds);
  }

  register(creds: AuthForm): Observable<AuthPayload> {
    return this.apiService.post('/auth/register', creds);
  }

  loadLoggedUser(): Observable<User> {
    return this.apiService.get('/users/self');
  }

  // TODO add Message type
  loadMessages(): Observable<any[]> {
    return this.apiService.get('/users/self/messages');
  }
}
