import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

@Component({
  selector: 'da-sender-form',
  templateUrl: './sender-form.component.html',
  styleUrls: ['./sender-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SenderFormComponent extends BaseFormComponent {
  @Input() form: FormGroup;
  @Input() loading: boolean;

  @Output() prev = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  submitForm() {
    if (this.form.valid) {
      this.save.emit();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  prevStep() {
    this.prev.emit();
  }
}
