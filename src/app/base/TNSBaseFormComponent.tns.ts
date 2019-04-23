import { ViewChild } from '@angular/core';

import { ValidationError } from '@common/models';
import { FeedbackService } from '@core/services';

import { RadDataForm } from 'nativescript-ui-dataform';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular';

export const ERROR_MESSAGE = 'Saving failed';

export abstract class TNSBaseFormComponent {
  protected abstract feedbackService: FeedbackService;

  @ViewChild('dataForm') dataForm: RadDataFormComponent;

  get dataform(): RadDataForm {
    return this.dataForm.dataForm;
  }

  protected handleError(err: ValidationError) {
    if (err.errors) {
      err.errors.forEach(({ path, message }) => {
        const formControl = this.dataform.getPropertyByName(path);
        if (formControl) {
          formControl.errorMessage = message;
          this.dataform.notifyValidated(path, false);
        }
      });
    }

    this.feedbackService.error(ERROR_MESSAGE);
  }
}
