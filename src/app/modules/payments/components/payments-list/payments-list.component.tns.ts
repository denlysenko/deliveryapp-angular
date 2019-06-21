import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewContainerRef
} from '@angular/core';

import { TNSBaseListComponent } from '@base/TNSBaseListComponent.tns';

import { paymentMethodNames, Roles } from '@common/enums';

import {
  ModalDialogOptions,
  ModalDialogService
} from 'nativescript-angular/modal-dialog';
import { ListViewLoadOnDemandMode } from 'nativescript-ui-listview';

import { ObservableArray } from 'tns-core-modules/data/observable-array';

import { Payment } from '../../models';
import { PaymentsFilterComponent } from '../payments-filter/payments-filter.component.tns';

@Component({
  selector: 'da-payments-list',
  templateUrl: './payments-list.component.tns.html',
  styleUrls: ['./payments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsListComponent extends TNSBaseListComponent<Payment> {
  readonly roles = Roles;
  readonly methods = paymentMethodNames;

  @Input() role: number;

  @Input()
  set payments(payments: Payment[]) {
    if (!this.data) {
      this.data = new ObservableArray(payments);
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[
          this.data.length >= this.count
            ? ListViewLoadOnDemandMode.None
            : ListViewLoadOnDemandMode.Auto
        ];
    } else {
      this.data.push(payments);
    }

    this.listView.notifyLoadOnDemandFinished();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
    super();
  }

  async onFilterButtonTap() {
    const options: ModalDialogOptions = {
      context: { sorting: this.sorting, filter: this.filter },
      fullscreen: true,
      viewContainerRef: this.viewContainerRef
    };

    const result = await this.modalService.showModal(
      PaymentsFilterComponent,
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
