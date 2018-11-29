import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(
  passwordKey: string,
  confirmationKey: string
) {
  return function(group: FormGroup) {
    const confirm = group.get(confirmationKey);
    const password = group.get(passwordKey);

    if (confirm.enabled && confirm.value !== password.value) {
      group.get(confirmationKey).setErrors({ mismatch: true });
    } else {
      return null;
    }
  };
}
