import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

@Component({
  selector: 'da-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsFormComponent extends BaseFormComponent {
  @Input() form: FormGroup;
}
