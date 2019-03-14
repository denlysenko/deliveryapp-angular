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
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersFilterComponent extends BaseComponent implements OnInit {
  sortOrder: number;
  sortField: string;

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
  filter: any = this.params.context;

  constructor(private params: ModalDialogParams) {
    super();
  }

  ngOnInit() {
    const { sortField, sortOrder } = extractSortFieldAndOrder(
      this.filter.sorting
    );
    this.sortField = sortField;
    this.sortOrder = sortOrder;
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
    this.sortOrder = this.sortField === field ? this.sortOrder * -1 : 1;
    this.sortField = field;
  }

  selectedIndexChanged(args) {
    const picker = <ListPicker>args.object;
    // this.selectedFilter = picker.selectedIndex;
  }

  onTextChanged(args) {
    const searchBar = <SearchBar>args.object;
    // this.searchString = searchBar.text;
  }

  onSubmit(args) {
    const searchBar = <SearchBar>args.object;
    // this.searchString = searchBar.text;
  }

  onCloseTap() {
    this.params.closeCallback(null);
  }
}
