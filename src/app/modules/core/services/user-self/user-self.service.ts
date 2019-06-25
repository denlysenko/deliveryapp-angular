import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';

import { Message } from '@messages/models';

import { User } from '@users/models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSelfService {
  constructor(private apiService: ApiService) {}

  loadSelf(): Observable<User> {
    return this.apiService.get('/users/self');
  }

  loadMessages(): Observable<Message[]> {
    return this.apiService.get('/users/self/messages');
  }
}
