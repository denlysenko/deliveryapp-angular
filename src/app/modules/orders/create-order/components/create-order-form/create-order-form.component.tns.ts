import { ChangeDetectionStrategy, Component } from '@angular/core';

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

  constructor(
    protected feedbackService: FeedbackService,
    protected loaderService: LoaderService
  ) {
    super();
  }
}
