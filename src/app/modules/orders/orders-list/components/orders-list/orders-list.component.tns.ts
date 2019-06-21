import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewContainerRef
} from '@angular/core';

import { TNSBaseListComponent } from '@base/TNSBaseListComponent.tns';

import { ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';

import {
  ModalDialogOptions,
  ModalDialogService
} from 'nativescript-angular/modal-dialog';
import { ListViewLoadOnDemandMode } from 'nativescript-ui-listview';

import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { Page } from 'tns-core-modules/ui/page';

import { Order } from '../../../models';
import { OrdersFilterComponent } from '../orders-filter/orders-filter.component.tns';

@Component({
  selector: 'da-orders-list',
  templateUrl: './orders-list.component.tns.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent extends TNSBaseListComponent<Order> {
  readonly statuses = ORDER_STATUSES;
  readonly roles = Roles;

  @Input() role: number;

  @Input()
  set orders(orders: Order[]) {
    if (!this.data) {
      this.data = new ObservableArray(orders);
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[
          this.data.length >= this.count
            ? ListViewLoadOnDemandMode.None
            : ListViewLoadOnDemandMode.Auto
        ];
    } else {
      this.data.push(orders);
    }

    this.listView.notifyLoadOnDemandFinished();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService,
    page: Page
  ) {
    super(page);
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
      const { offset, limit } = this.pagination;

      // reset offset before sorting
      this.paginationChanged.emit({
        limit: offset + limit,
        offset: 0
      });

      this.sortingChanged.emit(event);
    }

    if (isFiltering) {
      this.filterChanged.emit(event);
    }

    this.data = null;
  }
}
