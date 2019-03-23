import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { DEFAULT_LIMIT, ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import {
  ModalDialogOptions,
  ModalDialogService
} from 'nativescript-angular/modal-dialog';
import {
  ListViewEventData,
  ListViewLoadOnDemandMode,
  RadListView
} from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';

import { Color } from 'tns-core-modules/color/color';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

import { Order } from '../../../models';
import { OrdersFilterComponent } from '../orders-filter/orders-filter.component.tns';

@Component({
  selector: 'da-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent {
  readonly statuses = ORDER_STATUSES;
  readonly roles = Roles;

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
  @Input() filter: FilterChangeEvent;

  @Output() sortingChanged = new EventEmitter<SortingChangeEvent>();
  @Output() paginationChanged = new EventEmitter<PageChangeEvent>();
  @Output() filterChanged = new EventEmitter<FilterChangeEvent>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {}

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

  async onFilterButtonTap() {
    const options: ModalDialogOptions = {
      context: { sorting: this.sorting, filter: this.filter },
      fullscreen: true,
      viewContainerRef: this.viewContainerRef
    };

    const result = await this.modalService.showModal(
      OrdersFilterComponent,
      options
    );

    if (!result) {
      return;
    }

    const { isSorting, isFiltering, ...event } = result;

    if (isSorting) {
      this.data = null;
      this.sortingChanged.emit(event);
    }

    if (isFiltering) {
      this.data = null;
      this.filterChanged.emit(event);
    }
  }
}
