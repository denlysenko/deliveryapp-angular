import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BaseComponent } from '@base/BaseComponent';

import { extractSortFieldAndOrder } from '@common/utils';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import { SelectItem } from 'primeng/primeng';

import * as application from 'tns-core-modules/application';
import { ListPicker } from 'tns-core-modules/ui/list-picker';
import { SearchBar } from 'tns-core-modules/ui/search-bar';

declare var UISearchBarStyle: any;

@Component({
  selector: 'da-orders-filter',
  templateUrl: './orders-filter.component.tns.html',
  styleUrls: ['./orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersFilterComponent extends BaseComponent implements OnInit {
  sortOrder: number;
  sortField: string;
  search: string;
  selectedFilter = 0;

  options: SelectItem[] = [
    {
      label: 'Order number',
      value: 'filter[id]'
    },
    {
      label: 'Cargo Name',
      value: 'filter[cargoName]'
    },
    {
      label: 'From',
      value: 'filter[cityFrom]'
    },
    {
      label: 'To',
      value: 'filter[cityTo]'
    }
  ];

  items: string[] = this.options.map(item => item.label);

  constructor(private params: ModalDialogParams) {
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
        option => option.value === keys[0]
      );
      this.search = filter[keys[0]];
    }
  }

  onSearchLoaded(args) {
    const sb = <SearchBar>args.object;

    if (application.ios) {
      sb.ios.searchBarStyle = UISearchBarStyle.UISearchBarStyleMinimal;
    } else {
      sb.android.clearFocus();
    }
  }

  sort(field: string) {
    const sortOrder = this.sortField === field ? this.sortOrder * -1 : 1;
    const request = {
      [`order[${field}]`]: sortOrder === 1 ? 'asc' : 'desc',
      isSorting: true
    };

    this.params.closeCallback(request);
  }

  selectedIndexChanged(args) {
    const picker = <ListPicker>args.object;
    this.selectedFilter = picker.selectedIndex;
  }

  onTextChanged(args) {
    const searchBar = <SearchBar>args.object;
    this.search = searchBar.text;
  }

  onSubmit(args) {
    const searchBar = <SearchBar>args.object;
    this.search = searchBar.text;
    this.onApplyTap();
  }

  onApplyTap() {
    const request = {
      [this.options[this.selectedFilter].value]: this.search,
      isFiltering: true
    };

    this.params.closeCallback(request);
  }

  onCloseTap() {
    this.params.closeCallback(null);
  }
}
