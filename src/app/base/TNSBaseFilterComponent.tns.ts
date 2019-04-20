import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import * as application from 'tns-core-modules/application';
import { SearchBar } from 'tns-core-modules/ui/search-bar';

declare var UISearchBarStyle: any;

export abstract class TNSBaseFilterComponent {
  sortOrder: number;
  sortField: string;
  search: string;

  protected abstract params: ModalDialogParams;

  abstract onApplyTap(): void;

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

  onTextChanged(args) {
    const searchBar = <SearchBar>args.object;
    this.search = searchBar.text;
  }

  onSubmit(args) {
    const searchBar = <SearchBar>args.object;
    this.search = searchBar.text;
    this.onApplyTap();
  }

  onCloseTap() {
    this.params.closeCallback(null);
  }
}
