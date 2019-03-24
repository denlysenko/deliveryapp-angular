import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

@Component({
  selector: 'da-bank-details-form',
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankDetailsFormComponent extends BaseFormComponent {
  @Input() form: FormGroup;
}
