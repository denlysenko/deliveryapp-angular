import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { DEFAULT_LIMIT, ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';
import { PageChangeEvent, SortingChangeEvent } from '@common/models';
import { extractSortFieldAndOrder } from '@common/utils';

import {
  ListViewEventData,
  ListViewLoadOnDemandMode,
  RadListView
} from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';

import { Color } from 'tns-core-modules/color/color';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

import { Order } from '../../models';

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
  data: ObservableArray<Order>;

  @ViewChild('listView')
  listViewComponent: RadListViewComponent;

  get listView(): RadListView {
    return this.listViewComponent.listView;
  }

  @Input()
  set orders(orders: Order[]) {
    if (!this.data) {
      this.data = new ObservableArray(orders);
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[
          this.data.length < DEFAULT_LIMIT
            ? ListViewLoadOnDemandMode.None
            : ListViewLoadOnDemandMode.Auto
        ];
    } else {
      this.data.push(orders);
      this.listView.notifyLoadOnDemandFinished();
    }
  }

  @Input() role: number;
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

  onItemLoading(args: ListViewEventData) {
    if (args.index % 2 !== 0) {
      args.view.backgroundColor = new Color('#f6f8f9');
    }
  }

  onLoadMoreItemsRequested(args: ListViewEventData) {
    const listView: RadListView = args.object;

    if (this.data.length === this.count) {
      listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
      listView.notifyLoadOnDemandFinished();
      return;
    }

    this.paginationChanged.emit({
      limit: this.pagination.limit,
      offset: this.pagination.offset + DEFAULT_LIMIT
    });
  }

  // sort(event: SortEvent) {
  //   this.sortingChanged.emit({
  //     [`order[${event.field}]`]: event.order === 1 ? 'asc' : 'desc'
  //   });
  // }
}
