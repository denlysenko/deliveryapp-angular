import { EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { DEFAULT_LIMIT } from '@common/constants';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import {
  ListViewEventData,
  ListViewLoadOnDemandMode,
  RadListView
} from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import * as app from 'tns-core-modules/application';
import { Color } from 'tns-core-modules/color/color';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { getViewById } from 'tns-core-modules/ui/page';

export abstract class TNSBaseListComponent<T> {
  data: ObservableArray<T> | null = null;

  @ViewChild('listView', { static: true })
  listViewComponent: RadListViewComponent;

  get listView(): RadListView {
    return this.listViewComponent.listView;
  }

  @Input() count: number;

  @Input() sorting: SortingChangeEvent;
  @Input() pagination: PageChangeEvent;
  @Input() filter: FilterChangeEvent;

  @Output() sortingChanged = new EventEmitter<SortingChangeEvent>();
  @Output() paginationChanged = new EventEmitter<PageChangeEvent>();
  @Output() filterChanged = new EventEmitter<FilterChangeEvent>();

  onDrawerButtonTap() {
    const sideDrawer = <RadSideDrawer>getViewById(app.getRootView(), 'drawer');
    sideDrawer.toggleDrawerState();
  }

  onItemLoading(args: ListViewEventData) {
    if (args.index % 2 !== 0) {
      args.view.backgroundColor = new Color('#f6f8f9');
    }
  }

  onLoadMoreItemsRequested(args: ListViewEventData) {
    if (!this.data) {
      return;
    }

    const listView: RadListView = args.object;

    if (this.data.length >= this.count) {
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
}
