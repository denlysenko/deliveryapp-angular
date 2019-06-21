import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { BaseListComponent } from '@base/BaseListComponent';

import { paymentMethodNames, Roles } from '@common/enums';

import { Payment } from '../../models';

@Component({
  selector: 'da-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsListComponent extends BaseListComponent {
  readonly roles = Roles;
  readonly methods = paymentMethodNames;

  @Input() payments: Payment[];
  @Input() role: number;

  @Output() paymentSelected = new EventEmitter<Payment>();
  @Output() userSelected = new EventEmitter<number>();
}
