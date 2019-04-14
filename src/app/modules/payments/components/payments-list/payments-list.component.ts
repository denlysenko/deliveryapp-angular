import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BaseListComponent } from '@base/BaseListComponent';

import { Roles } from '@common/enums';

import { Payment } from '../../models';

@Component({
  selector: 'da-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsListComponent extends BaseListComponent {
  readonly roles = Roles;

  @Input() payments: Payment[];
  @Input() role: number;
}
