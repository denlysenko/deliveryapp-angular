import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';

import { User } from '@users/models';

import { Observable } from 'rxjs';

// tslint:disable-next-line:no-commented-code
// import { Message } from '../../lib/messages/Message';

@Injectable({
  providedIn: 'root'
})
export class UserSelfService {
  constructor(private apiService: ApiService) {}

  loadSelf(): Observable<User> {
    return this.apiService.get('/users/self');
  }

  // TODO add Message type
  loadMessages(): Observable<any[]> {
    return this.apiService.get('/users/self/messages');
  }
}
