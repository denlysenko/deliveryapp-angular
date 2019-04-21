import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { TNSBaseFormComponent } from '@base/TNSBaseFormComponent.tns';

import { PaymentMethod, paymentMethodNames, Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

import { OrdersService } from '@orders/services/orders.service';

import { UsersService } from '@users/services/users.service';

import { TokenModel } from 'nativescript-ui-autocomplete';
import { RadAutoCompleteTextViewComponent } from 'nativescript-ui-autocomplete/angular';

import { map } from 'rxjs/operators';

import { Payment } from '../../models';

@Component({
  selector: 'da-payment-form',
  templateUrl: './payment-form.component.tns.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent extends TNSBaseFormComponent
  implements AfterViewInit {
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

  @ViewChild('ordersAutocomplete')
  ordersAutocomplete: RadAutoCompleteTextViewComponent;

  @ViewChild('clientAutocomplete')
  clientAutocomplete: RadAutoCompleteTextViewComponent;

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

  ngAfterViewInit() {
    this.ordersAutocomplete.autoCompleteTextView.loadSuggestionsAsync = query => {
      return new Promise(resolve => {
        this.ordersService
          .getOrders({ 'filter[id]': query })
          .pipe(
            map(response => response.rows),
            map(orders =>
              orders.map(order => new TokenModel(order.id.toString(), null))
            )
          )
          .subscribe(orders => resolve(orders));
      });
    };

    this.clientAutocomplete.autoCompleteTextView.loadSuggestionsAsync = query => {
      return new Promise(resolve => {
        this.usersService
          .getUsers({ 'filter[role]': Roles.CLIENT, 'filter[email]': query })
          .pipe(
            map(response => response.rows),
            map(clients =>
              clients.map(client => new TokenModel(client.email, null))
            )
          )
          .subscribe(clients => resolve(clients));
      });
    };
  }

  populateOrders() {
    if (this.payment && this.payment.orders && this.payment.orders.length) {
      this.payment.orders.forEach(order =>
        this.ordersAutocomplete.autoCompleteTextView.addToken(
          new TokenModel(order.id.toString(), null)
        )
      );
    }
  }

  populateClient() {
    if (this.payment && this.payment.client) {
      this.clientAutocomplete.autoCompleteTextView.addToken(
        new TokenModel(this.payment.client.email, null)
      );
    }
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

  selectClient({ id }) {
    // this.form.patchValue({ clientId: id });
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
      description: (this.payment && this.payment.description) || null,
      clientId: (this.payment && this.payment.clientId) || null
    };
  }
}
