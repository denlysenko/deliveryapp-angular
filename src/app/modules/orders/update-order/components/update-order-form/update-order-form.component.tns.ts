import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ORDER_STATUSES } from '@common/constants';

import { FeedbackService, LoaderService } from '@core/services';

import { SelectItem } from 'primeng/primeng';

import { TNSOrderFormBase } from '../../../base/TNSOrderFormBase';
import { Order } from '../../../models';

@Component({
  selector: 'da-update-order-form',
  templateUrl: './update-order-form.component.html',
  styleUrls: ['./update-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateOrderFormComponent extends TNSOrderFormBase {
  // readonly paymentStatuses: SelectItem[] = [
  //   {
  //     label: 'Paid',
  //     value: true
  //   },
  //   {
  //     label: 'Not Paid',
  //     value: false
  //   }
  // ];

  orderStatuses: SelectItem[] = ORDER_STATUSES.map((status, index) => {
    return {
      label: status,
      value: index
    };
  });

  @Input() order: Order;

  constructor(
    protected feedbackService: FeedbackService,
    protected loaderService: LoaderService
  ) {
    super();
  }
}
