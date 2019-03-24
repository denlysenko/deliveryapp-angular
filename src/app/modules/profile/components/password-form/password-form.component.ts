import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { ValidationError } from '@common/models';

import { PasswordPayload } from '../../models';

@Component({
  selector: 'da-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormComponent extends BaseFormComponent {
  @Input() form: FormGroup;
  @Input() loading: boolean;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() passwordChanged = new EventEmitter<PasswordPayload>();

  save() {
    if (this.form.valid) {
      const { oldPassword, newPassword } = this.form.value;
      this.passwordChanged.emit({ oldPassword, newPassword });
    } else {
      this.validateAllFormFields();
    }
  }
}
