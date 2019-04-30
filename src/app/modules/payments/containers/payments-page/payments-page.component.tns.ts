import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { Page } from 'tns-core-modules/ui/page';

import { PaymentsPageBase } from '../../base/PaymentsPageBase';
import { PaymentsService } from '../../services/payments.service';
import { PaymentsFacade } from '../../store';

@Component({
  templateUrl: './payments-page.component.tns.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent extends PaymentsPageBase {
  constructor(
    route: ActivatedRoute,
    paymentsFacade: PaymentsFacade,
    coreFacade: CoreFacade,
    paymentsService: PaymentsService,
    loaderService: LoaderService,
    page: Page
  ) {
    super(route, paymentsFacade, coreFacade, paymentsService, loaderService);
    page.on('unloaded', this.ngOnDestroy.bind(this));
  }
}
