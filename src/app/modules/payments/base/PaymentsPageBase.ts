import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  ListResponse,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { EMPTY, merge, Observable } from 'rxjs';
import { catchError, finalize, map, skip, switchMap } from 'rxjs/operators';

import { Payment } from '../models';
import { PaymentsService } from '../services/payments.service';
import { PaymentsFacade } from '../store';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class PaymentsPageBase {
  readonly roles = Roles;

  data$: Observable<ListResponse<Payment>> = merge(
    this.route.data.pipe(
      map((data: { payments: ListResponse<Payment> }) => data.payments)
    ),
    this.paymentsFacade.allFilters$.pipe(
      skip(1),
      switchMap((paymentsFilter) => {
        this.loaderService.start();
        return this.paymentsService.getPayments(paymentsFilter).pipe(
          catchError(() => EMPTY),
          finalize(() => this.loaderService.stop())
        );
      })
    )
  );

  filter$ = this.paymentsFacade.filter$;
  sorting$ = this.paymentsFacade.sorting$;
  pagination$ = this.paymentsFacade.pagination$;
  role$ = this.coreFacade.role$;

  constructor(
    private readonly route: ActivatedRoute,
    protected readonly paymentsFacade: PaymentsFacade,
    private readonly coreFacade: CoreFacade,
    protected readonly paymentsService: PaymentsService,
    private readonly loaderService: LoaderService
  ) {}

  handleFilterChange(event: FilterChangeEvent) {
    this.paymentsFacade.doFiltering(event);
  }

  handleSortingChange(event: SortingChangeEvent) {
    this.paymentsFacade.sort(event);
  }

  handlePageChange(event: PageChangeEvent) {
    this.paymentsFacade.paginate(event);
  }
}
