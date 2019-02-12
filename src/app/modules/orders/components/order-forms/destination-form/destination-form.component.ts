import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';
import { Roles } from '@common/enums';
import { FeedbackService } from '@core/services';

import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'da-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationFormComponent extends BaseFormComponent {
  readonly roles = Roles;

  @Input() form: FormGroup;
  @Input() clients: SelectItem[];
  @Input() role: number;

  @Output() next = new EventEmitter<void>();

  constructor(protected feedbackService: FeedbackService) {
    super();
  }

  nextStep() {
    this.next.emit();
    // if (this.form.valid) {
    //   this.next.emit();
    // } else {
    //   this.validateAllFormFields(this.form);
    // }
  }
}
