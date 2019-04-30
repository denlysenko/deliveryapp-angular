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

import { SelectItem } from 'primeng/primeng';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

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
      value: 'filter[id]'
    },
    {
      label: 'Email',
      value: 'filter[email]'
    },
    {
      label: 'First Name',
      value: 'filter[firstName]'
    },
    {
      label: 'Last Name',
      value: 'filter[lastName]'
    }
  ];

  form: FormGroup;

  @Input() filter: FilterChangeEvent;

  @Output() filterChanged = new EventEmitter<FilterChangeEvent>();

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const keys = Object.keys(this.filter);
    // we know that filter in store always contains 2 fields (role[0], role[1]), which we can skip, and possibly one more, that is what we need

    this.form = this.fb.group({
      search: [keys.length ? this.filter[keys[2]] : ''],
      selectedFilter: [keys.length > 2 ? keys[2] : this.options[0].value]
    });

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(({ selectedFilter, search }) => {
        this.filterChanged.emit({
          [selectedFilter]: search
        });
      });
  }
}
