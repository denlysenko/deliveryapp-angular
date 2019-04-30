import { Injectable } from '@angular/core';

import { ListResponse } from '@common/models';

import { ApiService } from '@core/services/api.service';

import { User, UsersFilter } from '../models';

import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private apiService: ApiService) {}

  getUsers(query?: UsersFilter): Observable<ListResponse<User>> {
    return this.apiService.get('/users', query);
  }

  getById(id: number): Observable<User> {
    return this.apiService.get(`/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post('/users', user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.apiService.patch(`/users/${userId}`, user);
  }
}
