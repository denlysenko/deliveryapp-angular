import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';
import { PageChangeEvent, SortingChangeEvent } from '@common/models';

import { Order } from '../../models';

@Component({
  selector: 'da-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {
  statuses = ORDER_STATUSES;
  roles = Roles;
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
    const keys = Object.keys(this.sorting); // we know that store can contain only one key

    if (keys.length) {
      this.sortOrder = this.sorting[keys[0]] === 'asc' ? 1 : -1;
      const index = keys[0].indexOf('[');
      const lastIndex = keys[0].indexOf(']');
      this.sortField = keys[0].slice(index + 1, lastIndex);
    }
  }

  sort(event: any) {
    const field = `order[${event.field}]`;
    this.sortingChanged.emit({
      [field]: event.order === 1 ? 'asc' : 'desc'
    });
  }

  paginate(event: any) {
    this.paginationChanged.emit({
      limit: event.rows,
      offset: event.rows * event.page
    });
  }
}
