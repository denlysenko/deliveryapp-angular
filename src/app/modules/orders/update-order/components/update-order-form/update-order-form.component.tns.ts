import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { User } from '@auth/models';

import { ORDER_STATUSES } from '@common/constants';

import { FeedbackService, LoaderService } from '@core/services';

import { PropertyConverter } from 'nativescript-ui-dataform';

import { TNSOrderFormBase } from '../../../base/TNSOrderFormBase';
import { Order } from '../../../models';

class ClientConverter implements PropertyConverter {
  constructor(private client: User) {}

  convertTo() {
    return this.client.email;
  }

  convertFrom() {
    return this.client.email;
  }
}

@Component({
  selector: 'da-update-order-form',
  templateUrl: './update-order-form.component.html',
  styleUrls: ['./update-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateOrderFormComponent extends TNSOrderFormBase
  implements OnInit {
  readonly orderStatusesProvider = ORDER_STATUSES.map((status, index) => {
    return {
      label: status,
      key: index
    };
  });

  clientConverter: ClientConverter;

  @Input() order: Order;

  constructor(
    protected feedbackService: FeedbackService,
    protected loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.clientConverter = new ClientConverter(this.order.client);
  }
}
