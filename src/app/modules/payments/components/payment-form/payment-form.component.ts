import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PaymentMethods, paymentMethods, Roles } from '@common/enums';

import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'da-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent implements OnInit {
  readonly roles = Roles;

  readonly paymentStatuses: SelectItem[] = [
    {
      label: 'Paid',
      value: true
    },
    {
      label: 'Not Paid',
      value: false
    }
  ];

  readonly paymentMethods: SelectItem[] = [
    {
      label: paymentMethods[PaymentMethods.CASHLESS],
      value: PaymentMethods.CASHLESS
    },
    {
      label: paymentMethods[PaymentMethods.CASH],
      value: PaymentMethods.CASH
    }
  ];

  form: FormGroup;

  @Input() role: number;

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup(
      {
        id: new FormControl(null),
        total: new FormControl(
          {
            value: null,
            disabled: this.role === this.roles.CLIENT
          },
          Validators.required
        ),
        paymentAmount: new FormControl({
          value: null,
          disabled: this.role === this.roles.CLIENT
        }),
        status: new FormControl({
          value: this.paymentStatuses[1].value,
          disabled: this.role === this.roles.CLIENT
        }),
        method: new FormControl({
          value: this.paymentMethods[1].value,
          disabled: this.role === this.roles.CLIENT
        }),
        dueDate: new FormControl(
          {
            value: null,
            disabled: this.role === this.roles.CLIENT
          },
          Validators.required
        ),
        paymentDate: new FormControl({
          value: null,
          disabled: this.role === this.roles.CLIENT
        }),
        notes: new FormControl({
          value: null,
          disabled: this.role === this.roles.CLIENT
        }),
        description: new FormControl({
          value: null,
          disabled: this.role === this.roles.CLIENT
        }),
        clientId: new FormControl(
          {
            value: null,
            disabled: this.role === this.roles.CLIENT
          },
          Validators.required
        ),
        orders: new FormControl(
          {
            value: null,
            disabled: this.role === this.roles.CLIENT
          },
          Validators.required
        )
      },
      { updateOn: 'submit' }
    );
  }
}
