import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '@auth/models';
import { Roles } from '@common/enums';

@Component({
  selector: 'da-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent {
  readonly roles = Roles;

  order = {
    cityFrom: null,
    cityTo: null,
    addressFrom: null,
    addressTo: null,
    additionalData: null,
    cargoName: null,
    cargoWeight: null,
    cargoVolume: null,
    comment: null,
    senderCompany: null,
    senderName: null,
    senderEmail: null,
    senderPhone: null
  };

  @Input() role: number;

  @Input()
  set clients(clients: User[]) {
    if (clients) {
      this.clientsProvider = clients.map(client => ({
        key: client.id,
        label: client.email
      }));
    }
  }

  clientsProvider: { key: number; label: string }[];
}
