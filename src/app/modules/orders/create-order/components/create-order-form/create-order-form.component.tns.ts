import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@auth/models';

import { FeedbackService, LoaderService } from '@core/services';

import { TNSOrderFormBase } from '../../../base/TNSOrderFormBase';
import { Order } from '../../../models';

@Component({
  selector: 'da-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent extends TNSOrderFormBase {
  order: Order = {
    cityFrom: '',
    cityTo: '',
    addressFrom: '',
    addressTo: '',
    additionalData: '',
    cargoName: '',
    cargoWeight: 0,
    cargoVolume: null,
    comment: '',
    senderCompany: '',
    senderName: '',
    senderEmail: '',
    senderPhone: ''
  };

  clientsProvider: { key: number; label: string }[];

  @Input()
  set clients(clients: User[]) {
    if (clients) {
      this.clientsProvider = clients.map(client => ({
        key: client.id,
        label: client.email
      }));
    }
  }

  constructor(
    protected feedbackService: FeedbackService,
    protected loaderService: LoaderService
  ) {
    super();
  }

  async submit() {
    if (this.loading) {
      return;
    }

    const isValid = await this.dataform.validateAll();

    if (isValid) {
      this.submitted.emit(this.order);
    }
  }
}
