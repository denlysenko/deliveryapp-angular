import { EventEmitter, Input, Output } from '@angular/core';

import { TNSBaseFormComponent } from '@base/TNSBaseFormComponent';

import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';

import { Order } from '../models';

export abstract class TNSOrderFormBase extends TNSBaseFormComponent {
  abstract order: Order;

  protected abstract loaderService: LoaderService;

  readonly roles = Roles;

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
}
