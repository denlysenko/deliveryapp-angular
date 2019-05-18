import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '@base/BaseComponent';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LoaderService } from '@core/services';

import { EMPTY } from 'rxjs';
import { catchError, skip, switchMap, takeUntil } from 'rxjs/operators';

import { Log } from '../../models';
import { LogsService } from '../../services/logs.service';
import { LogsFacade } from '../../store';

@Component({
  selector: 'da-logs-page',
  templateUrl: './logs-page.component.html',
  styleUrls: ['./logs-page.component.scss']
})
export class LogsPageComponent extends BaseComponent implements OnInit {
  logs: Log[];
  count: number;

  filter$ = this.logsFacade.filter$;
  sorting$ = this.logsFacade.sorting$;
  pagination$ = this.logsFacade.pagination$;

  constructor(
    private logsFacade: LogsFacade,
    private route: ActivatedRoute,
    private logsService: LogsService,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.count = this.route.snapshot.data.logs.count;
    this.logs = this.route.snapshot.data.logs.rows;
    this.subscribeToFiltersChanges();
  }

  handleFilterChange(event: FilterChangeEvent) {
    this.logsFacade.doFiltering(event);
  }

  handleSortingChange(event: SortingChangeEvent) {
    this.logsFacade.sort(event);
  }

  handlePageChange(event: PageChangeEvent) {
    this.logsFacade.paginate(event);
  }

  private subscribeToFiltersChanges() {
    this.logsFacade.allFilters$
      .pipe(
        skip(1),
        switchMap(logsFilter => {
          this.loaderService.start();
          return this.logsService.getLogs(logsFilter).pipe(
            catchError(() => {
              this.loaderService.stop();
              return EMPTY;
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ count, rows }) => {
        this.loaderService.stop();
        this.logs = rows;
        this.count = count;
      });
  }
}
