import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

import { MenuItem } from 'primeng/api';

import { Order } from '../../../models';
import {
  cargoFormRequiredFields,
  destinationFormRequiredFields,
  ERROR_MESSAGE,
  FormGroupKeys,
  senderFormRequiredFields
} from '../../constants';

@Component({
  selector: 'da-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent extends BaseFormComponent
  implements OnInit {
  readonly items: MenuItem[] = [
    {
      label: 'Destination'
    },
    {
      label: 'Cargo'
    },
    {
      label: 'Sender'
    }
  ];
  readonly formGroupKeys = FormGroupKeys;

  activeIndex = 0;
  form: FormGroup;

  @Input() loading: boolean;
  @Input() role: number;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.activeIndex = 0;
      this.handleError(error);
    }
  }

  @Output() submitted = new EventEmitter<Order>();

  constructor(protected readonly feedbackService: FeedbackService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    this.submitted.emit({
      ...this.form.value[this.formGroupKeys.destinationForm],
      ...this.form.value[this.formGroupKeys.cargoForm],
      ...this.form.value[this.formGroupKeys.senderForm]
    });
  }

  private initForm() {
    this.form = new FormGroup({
      [this.formGroupKeys.destinationForm]: new FormGroup({
        cityFrom: new FormControl(null, Validators.required),
        cityTo: new FormControl(null, Validators.required),
        addressFrom: new FormControl(null, Validators.required),
        addressTo: new FormControl(null, Validators.required),
        additionalData: new FormControl(null)
      }),
      [this.formGroupKeys.cargoForm]: new FormGroup({
        cargoName: new FormControl(null, Validators.required),
        cargoWeight: new FormControl(null, Validators.required),
        cargoVolume: new FormControl(null),
        comment: new FormControl(null)
      }),
      [this.formGroupKeys.senderForm]: new FormGroup({
        senderCompany: new FormControl(null),
        senderName: new FormControl(null),
        senderEmail: new FormControl(null, Validators.required),
        senderPhone: new FormControl(null, Validators.required)
      })
    });

    if (this.role !== Roles.CLIENT) {
      (this.form.get(
        this.formGroupKeys.destinationForm
      ) as FormGroup).addControl(
        'clientId',
        new FormControl(null, Validators.required)
      );
    }
  }

  protected handleError(error: ValidationError) {
    if (error.errors && error.errors.length) {
      error.errors.forEach((field) => {
        let path = field.path;

        if (destinationFormRequiredFields.has(field.path)) {
          path = `${this.formGroupKeys.destinationForm}.${field.path}`;
        } else if (cargoFormRequiredFields.has(field.path)) {
          path = `${this.formGroupKeys.cargoForm}.${field.path}`;
        } else if (senderFormRequiredFields.has(field.path)) {
          path = `${this.formGroupKeys.senderForm}.${field.path}`;
        }

        const control = this.form.get(path);
        control.setErrors({ serverError: true });
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });

        this.errors[field.path] = field.message;
      });

      this.feedbackService.error(ERROR_MESSAGE);
    }
  }
}
