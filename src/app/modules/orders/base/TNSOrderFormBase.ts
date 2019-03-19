import { EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';

import { RadDataForm } from 'nativescript-ui-dataform';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular';

import { Order } from '../models';

export const ERROR_MESSAGE = 'Saving failed';

export abstract class TNSOrderFormBase {
  abstract order: Order;

  protected abstract loaderService: LoaderService;
  protected abstract feedbackService: FeedbackService;

  readonly roles = Roles;

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
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() submitted = new EventEmitter<Order>();

  private _loading = false;

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
