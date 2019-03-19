import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { ORDER_STATUSES } from '@common/constants';
import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { SelectItem } from 'primeng/primeng';
import { Order } from '../../../models';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular';
import { RadDataForm } from 'nativescript-ui-dataform';
import { FeedbackService, LoaderService } from '@core/services';

const ERROR_MESSAGE = 'Update failed';

@Component({
  selector: 'da-update-order-form',
  templateUrl: './update-order-form.component.html',
  styleUrls: ['./update-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateOrderFormComponent {
  readonly roles = Roles;
  // readonly paymentStatuses: SelectItem[] = [
  //   {
  //     label: 'Paid',
  //     value: true
  //   },
  //   {
  //     label: 'Not Paid',
  //     value: false
  //   }
  // ];

  orderStatuses: SelectItem[] = ORDER_STATUSES.map((status, index) => {
    return {
      label: status,
      value: index
    };
  });

  @Input() order: Order;
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
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @ViewChild('dataForm') dataForm: RadDataFormComponent;

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
