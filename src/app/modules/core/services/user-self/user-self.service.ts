import { Injectable } from '@angular/core';

import { ListResponse } from '@common/models';

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

  loadMessages(query?: any): Observable<ListResponse<Message>> {
    return this.apiService.get('/users/self/messages', query);
  }
}
