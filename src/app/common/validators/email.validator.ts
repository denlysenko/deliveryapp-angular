import { AbstractControl } from '@angular/forms';

/* tslint:disable:max-line-length */
// RFC recommended regex, see http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
export const emailRegex = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
/* tslint:enable:max-line-length */

export function validateEmail(value: string): boolean {
  return emailRegex.test(value);
}

export function emailValidator(control: AbstractControl): any {
  return !control.value || validateEmail(control.value)
    ? null
    : { email: true };
}
