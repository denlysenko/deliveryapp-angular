import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '@auth/models';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { PaymentMethod, paymentMethods, Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { OrdersService } from '@orders/services/orders.service';

import { UsersService } from '@users/services/users.service';

import { SelectItem } from 'primeng/primeng';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Payment } from '../../models';

@Component({
  selector: 'da-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent extends BaseFormComponent implements OnInit {
  readonly roles = Roles;

  readonly statuses: SelectItem[] = [
    {
      label: 'Paid',
      value: true
    },
    {
      label: 'Not Paid',
      value: false
    }
  ];

  readonly methods: SelectItem[] = [
    {
      label: paymentMethods[PaymentMethod.CASHLESS],
      value: PaymentMethod.CASHLESS
    },
    {
      label: paymentMethods[PaymentMethod.CASH],
      value: PaymentMethod.CASH
    }
  ];

  form: FormGroup;

  @Input() role: number;
  @Input() loading: boolean;

  @Input()
  set payment(payment: Payment) {
    this._payment = payment;

    if (payment) {
      this.form.patchValue(payment);
    } else {
      this.initForm();
    }
  }
  get payment(): Payment {
    return this._payment;
  }

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() submitted = new EventEmitter<Partial<Payment>>();

  private _payment: Payment;
  private orders = new BehaviorSubject<number[] | null>(null);
  private clients = new BehaviorSubject<User[] | null>(null);

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService
  ) {
    super();
  }

  get orders$(): Observable<number[] | null> {
    return this.orders.asObservable();
  }

  get clients$(): Observable<User[] | null> {
    return this.clients.asObservable();
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    const { valid, value } = this.form;

    if (valid) {
      this.submitted.emit(value);
    } else {
      this.validateAllFormFields();
    }
  }

  searchOrder({ query }) {
    this.ordersService
      .getOrders({ 'filter[id]': query })
      .pipe(
        map(response => response.rows),
        map(orders => orders.map(order => order.id))
      )
      .subscribe(orders => this.orders.next(orders));
  }

  searchClient({ query }) {
    this.usersService
      .getUsers({ 'filter[role]': Roles.CLIENT, 'filter[email]': query })
      .pipe(map(response => response.rows))
      .subscribe(users => this.clients.next(users));
  }

  selectClient({ id }) {
    this.form.patchValue({ clientId: id });
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
          value: this.statuses[1].value,
          disabled: this.role === this.roles.CLIENT
        }),
        method: new FormControl({
          value: this.methods[1].value,
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
