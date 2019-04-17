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

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

const selectedFilter = 'filter[id]';

@Component({
  selector: 'da-payments-filter',
  templateUrl: './payments-filter.component.html',
  styleUrls: ['./payments-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsFilterComponent extends BaseComponent implements OnInit {
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
