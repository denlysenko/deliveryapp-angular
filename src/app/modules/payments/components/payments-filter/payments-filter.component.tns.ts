import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TNSBaseFilterComponent } from '@base/TNSBaseFilterComponent';

import { extractSortFieldAndOrder } from '@common/utils';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

const selectedFilter = 'filter[id]';

@Component({
  selector: 'da-payments-filter',
  templateUrl: './payments-filter.component.tns.html',
  styleUrls: ['./payments-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsFilterComponent extends TNSBaseFilterComponent
  implements OnInit {
  constructor(protected params: ModalDialogParams) {
    super();
  }

  ngOnInit() {
    const { sorting, filter } = this.params.context;
    const { sortField, sortOrder } = extractSortFieldAndOrder(sorting);

    this.sortField = sortField;
    this.sortOrder = sortOrder;

    if (filter) {
      const keys = Object.keys(filter); // we know that filter in store contains only one key
      this.search = filter[keys[0]];
    }
  }

  onApplyTap() {
    const request = {
      [selectedFilter]: this.search,
      isFiltering: true
    };

    this.params.closeCallback(request);
  }
}
