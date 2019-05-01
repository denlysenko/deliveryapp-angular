import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { PaymentMethod, paymentMethodNames, Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { OrdersService } from '@orders/services/orders.service';

import { User } from '@users/models';
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
export class PaymentFormComponent extends BaseFormComponent {
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
      label: paymentMethodNames[PaymentMethod.CASHLESS],
      value: PaymentMethod.CASHLESS
    },
    {
      label: paymentMethodNames[PaymentMethod.CASH],
      value: PaymentMethod.CASH
    }
  ];

  form: FormGroup;
  client = new FormControl(null);

  @Input() role: number;
  @Input() loading: boolean;

  @Input()
  set payment(payment: Payment) {
    this._payment = payment;
    this.initForm();
    this.client.patchValue((payment && payment.client) || null);
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
    private usersService: UsersService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  get isClient(): boolean {
    return this.role === this.roles.CLIENT;
  }

  get orders$(): Observable<number[] | null> {
    return this.orders.asObservable();
  }

  get clients$(): Observable<User[] | null> {
    return this.clients.asObservable();
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

  // tslint:disable-next-line:cognitive-complexity
  private initForm() {
    this.form = new FormGroup(
      {
        id: new FormControl((this.payment && this.payment.id) || null),
        total: new FormControl(
          (this.payment && this.payment.total) || null,
          Validators.required
        ),
        paymentAmount: new FormControl(
          (this.payment && this.payment.paymentAmount) || null
        ),
        status: new FormControl(
          (this.payment && this.payment.status) || this.statuses[1].value
        ),
        method: new FormControl(
          (this.payment && this.payment.method) || this.methods[1].value
        ),
        dueDate: new FormControl(
          (this.payment &&
            this.payment.dueDate &&
            new Date(this.payment.dueDate)) ||
            null,
          Validators.required
        ),
        paymentDate: new FormControl(
          (this.payment &&
            this.payment.paymentDate &&
            new Date(this.payment.paymentDate)) ||
            null
        ),
        notes: new FormControl((this.payment && this.payment.notes) || null),
        description: new FormControl(
          (this.payment && this.payment.description) || null
        ),
        clientId: new FormControl(
          (this.payment && this.payment.clientId) || null,
          Validators.required
        ),
        orders: new FormControl(
          (this.payment &&
            this.payment.orders &&
            this.payment.orders.length &&
            this.payment.orders.map(order => order.id)) ||
            null,
          Validators.required
        )
      },
      { updateOn: 'submit' }
    );

    // to fix float label overlapping on inputs with native value property
    setTimeout(() => {
      this.cdr.markForCheck();
    });
  }
}
