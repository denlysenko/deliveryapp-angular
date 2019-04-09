import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

@Component({
  selector: 'da-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent extends BaseFormComponent {
  @Input() form: FormGroup;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  constructor(protected feedbackService: FeedbackService) {
    super();
  }
}
