import { Injectable } from '@angular/core';

import { ListResponse } from '@common/models';

import { ApiService } from '@core/services/api.service';

import { User } from '@users/models';

import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private apiService: ApiService) {}

  getUsers(query: any): Observable<ListResponse<User>> {
    return this.apiService.get('/users', query);
  }
}
