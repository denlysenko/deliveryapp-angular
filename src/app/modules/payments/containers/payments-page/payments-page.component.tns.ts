import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DEFAULT_LIMIT } from '@common/constants';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { PaymentsPageBase } from '../../base/PaymentsPageBase';
import { PaymentsService } from '../../services/payments.service';
import { PaymentsFacade } from '../../store';

@Component({
  templateUrl: './payments-page.component.tns.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent extends PaymentsPageBase
  implements OnDestroy {
  constructor(
    route: ActivatedRoute,
    paymentsFacade: PaymentsFacade,
    coreFacade: CoreFacade,
    paymentsService: PaymentsService,
    loaderService: LoaderService
  ) {
    super(route, paymentsFacade, coreFacade, paymentsService, loaderService);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentsFacade.paginate({
      limit: DEFAULT_LIMIT,
      offset: 0
    });
  }
}
