import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { ORDER_STATUSES } from '@common/constants';

import { FeedbackService, LoaderService } from '@core/services';

import { User } from '@users/models';

import { PropertyConverter } from 'nativescript-ui-dataform';

import { TNSOrderFormBase } from '../../../base/TNSOrderFormBase';
import { Order } from '../../../models';

class ClientConverter implements PropertyConverter {
  constructor(private client: User) {}

  convertTo() {
    return this.client;
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

  @Input()
  set order(order: Order) {
    delete order.creatorId;
    delete order.creator;
    delete order.payment;
    delete order.deletedAt;

    if (this.role === this.roles.CLIENT) {
      delete order.clientId;
      delete order.client;
    }

    this._order = order;
  }
  get order(): Order {
    return this._order;
  }

  private _order: Order;

  constructor(
    protected feedbackService: FeedbackService,
    protected loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.clientConverter = new ClientConverter(this.order.client);
  }

  async submit() {
    if (this.loading) {
      return;
    }

    const isValid = await this.dataform.validateAll();

    if (isValid) {
      const { client, clientId, createdAt, updatedAt, ...order } = this.order;
      this.submitted.emit(order);
    }
  }
}
