import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@base/BaseComponent';

import { FilterChangeEvent } from '@common/models';

import { SelectItem } from 'primeng/api';

@Component({
  selector: 'da-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersFilterComponent extends BaseComponent implements OnInit {
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

  form: FormGroup;

  @Input() filter: FilterChangeEvent;
  @Output() filterChanged = new EventEmitter<FilterChangeEvent>();

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const keys = Object.keys(this.filter); // we know that filter in store contains only one key

    this.form = this.fb.group({
      search: [keys.length ? this.filter[keys[0]] : ''],
      selectedFilter: [keys.length ? keys[0] : this.options[0].value]
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
