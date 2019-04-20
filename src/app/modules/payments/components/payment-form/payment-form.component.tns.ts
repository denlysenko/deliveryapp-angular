import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { User } from '@auth/models';

import { TNSBaseFormComponent } from '@base/TNSBaseFormComponent.tns';

import { PaymentMethod, paymentMethodNames, Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

import { OrdersService } from '@orders/services/orders.service';

import { UsersService } from '@users/services/users.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Payment } from '../../models';

@Component({
  selector: 'da-payment-form',
  templateUrl: './payment-form.component.tns.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent extends TNSBaseFormComponent {
  readonly roles = Roles;

  readonly methods = [
    {
      label: paymentMethodNames[PaymentMethod.CASHLESS],
      key: PaymentMethod.CASHLESS
    },
    {
      label: paymentMethodNames[PaymentMethod.CASH],
      key: PaymentMethod.CASH
    }
  ];

  form: any;
  client: User;

  @Input() role: number;
  @Input() loading: boolean;

  @Input()
  set payment(payment: Payment) {
    this._payment = payment;
    this.initForm();
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

  private _payment: Payment = null;
  private orders = new BehaviorSubject<number[] | null>(null);
  private clients = new BehaviorSubject<User[] | null>(null);

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    protected feedbackService: FeedbackService
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

  async submitForm() {
    if (this.loading) {
      return;
    }

    const isValid = await this.dataform.validateAll();

    if (isValid) {
      this.submitted.emit(this.form);
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
    this.form = {
      id: (this.payment && this.payment.id) || null,
      total: (this.payment && this.payment.total) || '',
      paymentAmount: (this.payment && this.payment.paymentAmount) || null,
      status: (this.payment && this.payment.status) || false,
      method: (this.payment && this.payment.method) || this.methods[1].key,
      dueDate:
        (this.payment &&
          this.payment.dueDate &&
          new Date(this.payment.dueDate)) ||
        '',
      paymentDate:
        (this.payment &&
          this.payment.paymentDate &&
          new Date(this.payment.paymentDate)) ||
        null,
      notes: (this.payment && this.payment.notes) || null,
      description: (this.payment && this.payment.description) || null
      // clientId: (this.payment && this.payment.clientId) || null,
      // orders:
      //   (this.payment &&
      //     this.payment.orders &&
      //     this.payment.orders.length &&
      //     this.payment.orders.map(order => order.id)) ||
      //   null
    };
  }
}
