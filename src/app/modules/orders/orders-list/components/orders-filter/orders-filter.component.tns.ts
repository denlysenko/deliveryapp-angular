import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TNSBaseFilterComponent } from '@base/TNSBaseFilterComponent.tns';

import { extractSortFieldAndOrder } from '@common/utils';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import { SelectItem } from 'primeng/api';

import { ListPicker } from 'tns-core-modules/ui/list-picker';

@Component({
  selector: 'da-orders-filter',
  templateUrl: './orders-filter.component.tns.html',
  styleUrls: ['./orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersFilterComponent extends TNSBaseFilterComponent
  implements OnInit {
  selectedFilter = 0;

  options: SelectItem[] = [
    {
      label: 'Order number',
      value: 'id'
    },
    {
      label: 'Cargo Name',
      value: 'cargoName'
    },
    {
      label: 'From',
      value: 'cityFrom'
    },
    {
      label: 'To',
      value: 'cityTo'
    }
  ];

  items: string[] = this.options.map((item) => item.label);

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

      this.selectedFilter = this.options.findIndex(
        (option) => option.value === keys[0]
      );
      this.search = filter[keys[0]];
    }
  }

  selectedIndexChanged(args) {
    const picker = <ListPicker>args.object;
    this.selectedFilter = picker.selectedIndex;
  }

  onApplyTap() {
    const request = {
      [this.options[this.selectedFilter].value]: this.search,
      isFiltering: true
    };

    this.params.closeCallback(request);
  }
}
