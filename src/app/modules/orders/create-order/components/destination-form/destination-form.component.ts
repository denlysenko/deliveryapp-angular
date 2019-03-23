import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';
import { Roles } from '@common/enums';

import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'da-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss']
})
export class DestinationFormComponent extends BaseFormComponent {
  readonly roles = Roles;

  @Input() form: FormGroup;
  @Input() clients: SelectItem[];
  @Input() role: number;
  @Input() errors: { [key: string]: string };

  @Output() next = new EventEmitter<void>();

  nextStep() {
    if (this.form.valid) {
      this.next.emit();
    } else {
      this.validateAllFormFields(this.form);
    }
  }
}
