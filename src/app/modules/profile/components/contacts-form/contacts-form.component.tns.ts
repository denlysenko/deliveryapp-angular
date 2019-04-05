import { Component, Input, ViewChild } from '@angular/core';

import { TNSBaseFormComponent } from '@base/TNSBaseFormComponent';

import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

import { RadDataFormComponent } from 'nativescript-ui-dataform/angular';

@Component({
  selector: 'da-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent extends TNSBaseFormComponent {
  @Input() form: any;

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @ViewChild('dataForm') dataForm: RadDataFormComponent;

  constructor(protected feedbackService: FeedbackService) {
    super();
  }

  async validate() {
    return await this.dataform.validateAll();
  }
}
