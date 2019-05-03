import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ListResponse } from '@common/models';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Log, LogsFilter } from '../models';
import { LogsService } from '../services/logs.service';

@Injectable()
export class LogsResolver implements Resolve<ListResponse<Log>> {
  constructor(
    private logsService: LogsService,
    private coreFacade: CoreFacade,
    private logsFacade: LogsFacade
  ) {}

  resolve(): Observable<ListResponse<Log>> {
    return this.coreFacade.self$.pipe(
      withLatestFrom(this.logsFacade.allFilters$),
      switchMap(([_, logsFilter]: [never, LogsFilter]) =>
        this.logsService.getLogs(logsFilter)
      ),
      take(1)
    );
  }
}
