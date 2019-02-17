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
  selector: 'da-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CargoFormComponent extends BaseFormComponent {
  @Input() form: FormGroup;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  nextStep() {
    if (this.form.valid) {
      this.next.emit();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  prevStep() {
    this.prev.emit();
  }
}
