import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { TNSBaseFormComponent } from '@base/TNSBaseFormComponent';

import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

import { RadDataFormComponent } from 'nativescript-ui-dataform/angular';

@Component({
  selector: 'da-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormComponent extends TNSBaseFormComponent {
  @Input() form: any;
  @Input() loading: boolean;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @ViewChild('dataForm') dataForm: RadDataFormComponent;

  @Output() passwordChanged = new EventEmitter<void>();

  constructor(protected feedbackService: FeedbackService) {
    super();
  }

  async save() {
    const isValid = await this.dataform.validateAll();

    if (isValid) {
      this.passwordChanged.emit();
    }
  }
}
