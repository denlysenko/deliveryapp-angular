import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  FilterChangeEvent,
  ListResponse,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LoaderService } from '@core/services';

import { UserViewService } from '@user-view/user-view.service';

import { EMPTY, merge, Observable } from 'rxjs';
import { catchError, finalize, map, skip, switchMap } from 'rxjs/operators';

import { Log } from '../../models';
import { LogsService } from '../../services/logs.service';
import { LogsFacade } from '../../store';

@Component({
  selector: 'da-logs-page',
  templateUrl: './logs-page.component.html',
  styleUrls: ['./logs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsPageComponent {
  data$: Observable<ListResponse<Log>> = merge(
    this.route.data.pipe(map((data: { logs: ListResponse<Log> }) => data.logs)),
    this.logsFacade.allFilters$.pipe(
      skip(1),
      switchMap((logsFilter) => {
        this.loaderService.start();
        return this.logsService.getLogs(logsFilter).pipe(
          catchError(() => EMPTY),
          finalize(() => this.loaderService.stop())
        );
      })
    )
  );

  filter$ = this.logsFacade.filter$;
  sorting$ = this.logsFacade.sorting$;
  pagination$ = this.logsFacade.pagination$;

  constructor(
    private readonly logsFacade: LogsFacade,
    private readonly route: ActivatedRoute,
    private readonly logsService: LogsService,
    private readonly loaderService: LoaderService,
    private readonly userViewService: UserViewService
  ) {}

  handleFilterChange(event: FilterChangeEvent) {
    this.logsFacade.doFiltering(event);
  }

  handleSortingChange(event: SortingChangeEvent) {
    this.logsFacade.sort(event);
  }

  handlePageChange(event: PageChangeEvent) {
    this.logsFacade.paginate(event);
  }

  showUser(id: number) {
    this.userViewService.show(id);
  }
}
