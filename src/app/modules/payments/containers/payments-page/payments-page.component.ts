import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@base/BaseComponent';

import { Roles } from '@common/enums';

import { CoreFacade } from '@core/store';

import { Payment } from '../../models';
import { PaymentsFacade } from '../../store';

@Component({
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent extends BaseComponent implements OnInit {
  readonly roles = Roles;

  payments: Payment[];
  count: number;

  filter$ = this.paymentsFacade.filter$;
  sorting$ = this.paymentsFacade.sorting$;
  pagination$ = this.paymentsFacade.pagination$;
  role$ = this.coreFacade.role$;

  constructor(
    private paymentsFacade: PaymentsFacade,
    private coreFacade: CoreFacade
  ) {
    super();
  }

  ngOnInit() {}

  onFilterChange(e) {
    console.log(e);
  }
}
