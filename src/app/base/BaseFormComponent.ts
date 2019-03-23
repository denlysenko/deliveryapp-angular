import { FormControl, FormGroup } from '@angular/forms';

import { FeedbackService } from '@core/services';

export abstract class BaseFormComponent {
  form: FormGroup;
  errors: { [key: string]: string } = {};

  protected feedbackService?: FeedbackService;

  protected handleError(error: any) {
    if (error.errors && error.errors.length) {
      error.errors.forEach(field => {
        this.form.get(field.path).setErrors({ serverError: true });
        this.errors[field.path] = field.message;
      });
    } else if (error.message) {
      this.feedbackService.error(error.message);
    }
  }

  protected validateAllFormFields(formGroup: FormGroup = this.form) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
