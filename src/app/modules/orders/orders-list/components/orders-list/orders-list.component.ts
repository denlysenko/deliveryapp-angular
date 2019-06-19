import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { BaseListComponent } from '@base/BaseListComponent';

import { ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';

import { Order } from '../../../models';

@Component({
  selector: 'da-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent extends BaseListComponent {
  readonly statuses = ORDER_STATUSES;
  readonly roles = Roles;

  @Input() role: number;
  @Input() orders: Order[];

  @Output() userSelected = new EventEmitter<number>();
}
