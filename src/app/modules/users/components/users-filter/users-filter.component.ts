import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BaseComponent } from '@base/BaseComponent';

import { FilterChangeEvent } from '@common/models';

import { SelectItem } from 'primeng/api';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { UsersFilter } from '../../models';

@Component({
  selector: 'da-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFilterComponent extends BaseComponent implements OnInit {
  readonly options: SelectItem[] = [
    {
      label: 'ID',
      value: 'id'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: 'First Name',
      value: 'firstName'
    },
    {
      label: 'Last Name',
      value: 'lastName'
    }
  ];

  form: FormGroup;

  @Input() filter: UsersFilter['filter'];

  @Output() filterChanged = new EventEmitter<FilterChangeEvent>();

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const keys = Object.keys(this.filter);
    // we know that filter in store always contains 1 fields (role), which we can skip, and possibly one more, that is what we need

    this.form = this.fb.group({
      search: [keys.length ? this.filter[keys[1]] : ''],
      selectedFilter: [keys.length > 1 ? keys[1] : this.options[0].value]
    });

    this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(({ selectedFilter, search }) => {
        this.filterChanged.emit({
          [selectedFilter]: search
        });
      });
  }
}
