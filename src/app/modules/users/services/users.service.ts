import { Injectable } from '@angular/core';

import { ListResponse } from '@common/models';

import { ApiService } from '@core/services/api.service';

import { User, UsersFilter } from '../models';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private readonly apiService: ApiService) {}

  loadSelf(): Observable<User> {
    return this.apiService.get('/users/self');
  }

  getUsers(query?: Partial<UsersFilter>): Observable<ListResponse<User>> {
    return this.apiService.get('/users', query);
  }

  getById(id: number): Observable<User> {
    return this.apiService.get(`/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post('/users', user);
  }

  updateUser(user: User): Observable<User> {
    const { id } = user;
    return this.apiService.patch(`/users/${id}`, user);
  }
}
