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

import { actionNames } from '@common/enums';
import { FilterChangeEvent } from '@common/models';

import { SelectItem } from 'primeng/primeng';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

const selectedFilter = 'filter[action]';

@Component({
  selector: 'da-logs-filter',
  templateUrl: './logs-filter.component.html',
  styleUrls: ['./logs-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsFilterComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  actions: SelectItem[] = actionNames.map((value, index) => {
    return {
      label: value,
      value: index
    };
  });

  @Input() filter: FilterChangeEvent;

  @Output() filterChanged = new EventEmitter<FilterChangeEvent>();

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const keys = Object.keys(this.filter); // we know that filter in store contains only one key

    this.form = this.fb.group({
      search: [keys.length ? this.filter[keys[0]] : '']
    });

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(({ search }) => {
        this.filterChanged.emit({
          [selectedFilter]: search
        });
      });
  }
}
