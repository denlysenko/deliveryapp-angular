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

import { User } from '@users/models';
import { UsersService } from '@users/services/users.service';

import { TokenModel } from 'nativescript-ui-autocomplete';
import { RadAutoCompleteTextViewComponent } from 'nativescript-ui-autocomplete/angular';

import { map, tap } from 'rxjs/operators';

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
  ordersFieldValid = true;
  clientFieldValid = true;

  @ViewChild('ordersAutocomplete', { static: true })
  ordersAutocomplete: RadAutoCompleteTextViewComponent;

  @ViewChild('clientAutocomplete', { static: true })
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
  private clients: User[] = [];

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
            tap(clients => {
              this.clients = clients;
            }),
            map(clients =>
              clients.map(client => new TokenModel(client.email, null))
            )
          )
          .subscribe(clients => resolve(clients));
      });
    };
  }

  populateOrders() {
    if (this.isClient) {
      this.ordersAutocomplete.autoCompleteTextView.readOnly = true;
    }

    if (this.payment && this.payment.orders && this.payment.orders.length) {
      this.payment.orders.forEach(order =>
        this.ordersAutocomplete.autoCompleteTextView.addToken(
          new TokenModel(order.id.toString(), null)
        )
      );
    }
  }

  addOrder(args) {
    const id = args.token ? args.token.text : args.text;
    this.form.orders.push(parseInt(id, 10));
    this.form.orders = [...new Set(this.form.orders)];
  }

  removeOrder(args) {
    const id = args.token ? args.token.text : args.text;
    this.form.orders = this.form.orders.filter(
      item => item !== parseInt(id, 10)
    );
  }

  populateClient() {
    if (this.isClient) {
      this.clientAutocomplete.autoCompleteTextView.readOnly = true;
    }

    if (this.payment && this.payment.client) {
      this.clientAutocomplete.autoCompleteTextView.addToken(
        new TokenModel(this.payment.client.email, null)
      );
    }
  }

  selectClient(args) {
    const client = this.clients.find(item => item.email === args.text);

    if (client) {
      this.form.clientId = client.id;
    }
  }

  onClientTextChange(args) {
    this.clientFieldValid = true;

    if (args.text === '') {
      this.form.clientId = null;
    }
  }

  async submitForm() {
    if (this.loading) {
      return;
    }

    const isFormValid = await this.dataform.validateAll();
    const isOrdersAndClientValid = this.validateOrdersAndClient();

    if (isFormValid && isOrdersAndClientValid) {
      this.submitted.emit(this.form);
    }
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
      clientId: (this.payment && this.payment.clientId) || null,
      orders:
        (this.payment &&
          this.payment.orders &&
          this.payment.orders.map(order => order.id)) ||
        []
    };
  }

  private validateOrdersAndClient(): boolean {
    if (!this.form.clientId) {
      this.clientFieldValid = false;
    }

    if (!this.form.orders.length) {
      this.ordersFieldValid = false;
    }

    return this.clientFieldValid && this.ordersFieldValid;
  }
}
