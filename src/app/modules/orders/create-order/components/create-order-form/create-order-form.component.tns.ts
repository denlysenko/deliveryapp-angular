import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

import { Roles } from '@common/enums';

import { FeedbackService, LoaderService } from '@core/services';

import { User } from '@users/models';
import { UsersService } from '@users/services/users.service';

import { TokenModel } from 'nativescript-ui-autocomplete';
import { RadAutoCompleteTextViewComponent } from 'nativescript-ui-autocomplete/angular';

import { map, tap } from 'rxjs/operators';

import { TNSOrderFormBase } from '../../../base/TNSOrderFormBase';
import { Order } from '../../../models';

@Component({
  selector: 'da-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent extends TNSOrderFormBase
  implements AfterViewInit {
  order: Order = {
    cityFrom: '',
    cityTo: '',
    addressFrom: '',
    addressTo: '',
    additionalData: '',
    cargoName: '',
    cargoWeight: 0,
    cargoVolume: null,
    comment: '',
    senderCompany: '',
    senderName: '',
    senderEmail: '',
    senderPhone: ''
  };

  clientFieldValid = true;

  @ViewChild('clientAutocomplete')
  clientAutocomplete: RadAutoCompleteTextViewComponent;

  private clients: User[] = [];

  constructor(
    protected feedbackService: FeedbackService,
    protected loaderService: LoaderService,
    private usersService: UsersService
  ) {
    super();
  }

  ngAfterViewInit() {
    if (this.role !== Roles.CLIENT) {
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
  }

  selectClient(args) {
    const client = this.clients.find(item => item.email === args.text);

    if (client) {
      this.order.clientId = client.id;
    }
  }

  onClientTextChange(args) {
    this.clientFieldValid = true;

    if (args.text === '') {
      this.order.clientId = null;
    }
  }

  async submit() {
    if (this.loading) {
      return;
    }

    const isValid = await this.dataform.validateAll();
    const isClientValid = this.validateClient();

    if (isValid && isClientValid) {
      this.submitted.emit(this.order);
    }
  }

  private validateClient(): boolean {
    if (!this.order.clientId) {
      this.clientFieldValid = false;
    }

    return this.clientFieldValid;
  }
}
