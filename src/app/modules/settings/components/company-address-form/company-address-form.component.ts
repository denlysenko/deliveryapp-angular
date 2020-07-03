import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { ValidationError } from '@common/models';

import { CompanyAddress } from '../../models';

@Component({
  selector: 'da-company-address-form',
  templateUrl: './company-address-form.component.html',
  styleUrls: ['./company-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyAddressFormComponent extends BaseFormComponent
  implements OnInit {
  @Input() address: CompanyAddress;
  @Input() loading: boolean;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() formSubmitted = new EventEmitter<CompanyAddress>();

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    const { valid, value } = this.form;
    if (valid) {
      this.formSubmitted.emit(value);
    } else {
      this.validateAllFormFields();
    }
  }

  private initForm() {
    this.form = new FormGroup(
      {
        id: new FormControl((this.address && this.address.id) || null),
        country: new FormControl(
          (this.address && this.address.country) || null
        ),
        city: new FormControl((this.address && this.address.city) || null),
        street: new FormControl((this.address && this.address.street) || null),
        house: new FormControl((this.address && this.address.house) || null)
      },
      { updateOn: 'submit' }
    );

    // to fix float label overlapping on inputs with native value property
    setTimeout(() => {
      this.cdr.markForCheck();
    });
  }
}
