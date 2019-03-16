import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';
import { PageChangeEvent, SortingChangeEvent } from '@common/models';
import { extractSortFieldAndOrder } from '@common/utils';
import { SortEvent } from 'primeng/primeng';

import { Order } from '../../../models';

@Component({
  selector: 'da-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {
  readonly statuses = ORDER_STATUSES;
  readonly roles = Roles;

  sortField: string;
  sortOrder: number;

  @Input() role: number;
  @Input() orders: Order[];
  @Input() count: number;
  @Input() sorting: SortingChangeEvent;
  @Input() pagination: PageChangeEvent;

  @Output() sortingChanged = new EventEmitter<SortingChangeEvent>();
  @Output() paginationChanged = new EventEmitter<PageChangeEvent>();

  ngOnInit() {
    const { sortField, sortOrder } = extractSortFieldAndOrder(this.sorting);
    this.sortField = sortField;
    this.sortOrder = sortOrder;
  }

  sort(event: SortEvent) {
    this.sortingChanged.emit({
      [`order[${event.field}]`]: event.order === 1 ? 'asc' : 'desc'
    });
  }

  paginate(event: any) {
    this.paginationChanged.emit({
      limit: event.rows,
      offset: event.rows * event.page
    });
  }
}
