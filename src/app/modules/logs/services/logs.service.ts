import { Injectable } from '@angular/core';

import { ListResponse } from '@common/models';

import { ApiService } from '@core/services/api.service';

import { Observable } from 'rxjs';

import { Log, LogsFilter } from '../models';

@Injectable()
export class LogsService {
  constructor(private apiService: ApiService) {}

  getLogs(query?: LogsFilter): Observable<ListResponse<Log>> {
    return this.apiService.get('/logs', query);
  }
}
