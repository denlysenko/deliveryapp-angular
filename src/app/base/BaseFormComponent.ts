import { FormControl, FormGroup } from '@angular/forms';

export abstract class BaseFormComponent {
  errors: { [key: string]: string } = {};

  protected handleError(formGroup: FormGroup, error: any) {
    if (error.errors && error.errors.length) {
      error.errors.forEach(field => {
        formGroup.get(field.path).setErrors({ serverError: true });
        this.errors[field.path] = field.message;
      });
    }
  }

  protected validateAllFormFields(formGroup: FormGroup) {
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
