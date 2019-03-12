import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';
import { emailValidator } from '@common/validators';

import { SelectItem } from 'primeng/primeng';
import { Order } from '../../../models';

@Component({
  selector: 'da-update-order-form',
  templateUrl: './update-order-form.component.html',
  styleUrls: ['./update-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateOrderFormComponent extends BaseFormComponent
  implements OnInit {
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

  orderStatuses: SelectItem[] = ORDER_STATUSES.map((status, index) => {
    return {
      label: status,
      value: index
    };
  });

  @Input() order: Order;
  @Input() role: number;
  @Input() loading: boolean;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() submitted = new EventEmitter<Order>();
  @Output() back = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    } else {
      this.validateAllFormFields();
    }
  }

  goBack() {
    this.back.emit();
  }

  private initForm() {
    this.form = new FormGroup(
      {
        id: new FormControl(this.order.id),
        cityFrom: new FormControl(this.order.cityFrom, Validators.required),
        cityTo: new FormControl(this.order.cityTo, Validators.required),
        addressFrom: new FormControl(
          this.order.addressFrom,
          Validators.required
        ),
        addressTo: new FormControl(this.order.addressTo, Validators.required),
        cargoName: new FormControl(this.order.cargoName, Validators.required),
        additionalData: new FormControl(this.order.additionalData),
        comment: new FormControl(this.order.comment),
        cargoWeight: new FormControl(
          this.order.cargoWeight,
          Validators.required
        ),
        cargoVolume: new FormControl(this.order.cargoVolume),
        senderName: new FormControl(this.order.senderName),
        senderCompany: new FormControl(this.order.senderCompany),
        senderEmail: new FormControl(
          this.order.senderEmail,
          Validators.compose([Validators.required, emailValidator])
        ),
        senderPhone: new FormControl(
          this.order.senderPhone,
          Validators.required
        ),
        status: new FormControl({
          value: this.order.status,
          disabled: this.role === this.roles.CLIENT
        }),
        deliveryCosts: new FormControl({
          value: this.order.deliveryCosts,
          disabled: this.role === this.roles.CLIENT
        }),
        deliveryDate: new FormControl({
          value: this.order.deliveryDate
            ? new Date(this.order.deliveryDate)
            : null,
          disabled: this.role === this.roles.CLIENT
        }),
        paid: new FormControl({
          value: this.order.paid,
          disabled: this.role === this.roles.CLIENT
        }),
        paymentDate: new FormControl({
          value: this.order.paymentDate
            ? new Date(this.order.paymentDate)
            : null,
          disabled: this.role === this.roles.CLIENT
        }),
        invoiceId: new FormControl({
          value: this.order.invoiceId,
          disabled: this.role === this.roles.CLIENT
        })
      },
      { updateOn: 'submit' }
    );

    // to fix float label overlapping on inputs with native value property
    setTimeout(() => {
      this.cdr.markForCheck();
    });
  }
}
