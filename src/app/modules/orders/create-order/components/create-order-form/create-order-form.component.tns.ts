import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { User } from '@auth/models';

import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';

import { RadDataForm } from 'nativescript-ui-dataform';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular';

import { Order } from '../../../models';
import { ERROR_MESSAGE } from '../../constants';

@Component({
  selector: 'da-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent {
  readonly roles = Roles;

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

  clientsProvider: { key: number; label: string }[];

  @ViewChild('dataForm') dataForm: RadDataFormComponent;

  @Input() role: number;

  @Input()
  set loading(isLoading: boolean) {
    this._loading = isLoading;
    this.loaderService[isLoading ? 'start' : 'stop']();
  }
  get loading(): boolean {
    return this._loading;
  }

  @Input()
  set clients(clients: User[]) {
    if (clients) {
      this.clientsProvider = clients.map(client => ({
        key: client.id,
        label: client.email
      }));
    }
  }

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() submitted = new EventEmitter<Order>();

  private _loading = false;

  constructor(
    private feedbackService: FeedbackService,
    private loaderService: LoaderService
  ) {}

  get dataform(): RadDataForm {
    return this.dataForm.dataForm;
  }

  async submit() {
    if (this.loading) {
      return;
    }

    const isValid = await this.dataform.validateAll();

    if (isValid) {
      this.submitted.emit(this.order);
    }
  }

  private handleError(err: ValidationError) {
    if (err.errors) {
      err.errors.forEach(({ path, message }) => {
        const formControl = this.dataform.getPropertyByName(path);
        if (formControl) {
          formControl.errorMessage = message;
          this.dataform.notifyValidated(path, false);
        }
      });
    }

    this.feedbackService.error(ERROR_MESSAGE);
  }
}
