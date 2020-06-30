import { EventEmitter, Input, OnInit, Output, Directive } from '@angular/core';

import { PageChangeEvent, SortingChangeEvent } from '@common/models';
import { extractSortFieldAndOrder } from '@common/utils';

import { SortEvent } from 'primeng/api';

@Directive()
export abstract class BaseListComponent implements OnInit {
  sortField: string;
  sortOrder: number;

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

  sort(event: SortEvent) {
    this.sortingChanged.emit({
      [`order[${event.field}]`]: event.order === 1 ? 'asc' : 'desc'
    });
  }

  paginate(event: any) {
    this.paginationChanged.emit({
      limit: event.rows,
      offset: event.rows * event.page
    });
  }
}
