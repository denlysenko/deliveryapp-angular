import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { ValidationError } from '@common/models';

import { CompanyBankDetails } from '../../models';

@Component({
  selector: 'da-company-bank-details-form',
  templateUrl: './company-bank-details-form.component.html',
  styleUrls: ['./company-bank-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyBankDetailsFormComponent extends BaseFormComponent
  implements OnInit {
  @Input() bankDetails: CompanyBankDetails;
  @Input() loading: boolean;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() formSubmitted = new EventEmitter<CompanyBankDetails>();

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
        id: new FormControl((this.bankDetails && this.bankDetails.id) || null),
        name: new FormControl(
          (this.bankDetails && this.bankDetails.name) || null
        ),
        accountNumber: new FormControl(
          (this.bankDetails && this.bankDetails.accountNumber) || null
        ),
        bin: new FormControl(
          (this.bankDetails && this.bankDetails.bin) || null
        ),
        swift: new FormControl(
          (this.bankDetails && this.bankDetails.swift) || null
        )
      },
      { updateOn: 'submit' }
    );
  }
}
