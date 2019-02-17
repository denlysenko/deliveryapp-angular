import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Roles } from '@common/enums';
import { FeedbackService } from '@core/services';

import { MenuItem, SelectItem } from 'primeng/primeng';

@Component({
  selector: 'da-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Destination'
    },
    {
      label: 'Cargo'
    },
    {
      label: 'Sender'
    }
  ];
  activeIndex = 0;
  form: FormGroup;

  @Input() clients: SelectItem[];
  @Input() loading: boolean;
  @Input() role: number;

  @Input()
  set error(error: any) {
    this.handleError(error);
  }

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      destinationForm: new FormGroup(
        {
          cityFrom: new FormControl(null, Validators.required),
          cityTo: new FormControl(null, Validators.required),
          addressFrom: new FormControl(null, Validators.required),
          addressTo: new FormControl(null, Validators.required),
          additionalData: new FormControl(null)
        },
        { updateOn: 'submit' }
      ),
      cargoForm: new FormGroup(
        {
          cargoName: new FormControl(null, Validators.required),
          cargoWeight: new FormControl(null, Validators.required),
          cargoVolume: new FormControl(null),
          comment: new FormControl(null)
        },
        { updateOn: 'submit' }
      ),
      senderForm: new FormGroup(
        {
          senderCompany: new FormControl(null),
          senderName: new FormControl(null),
          senderEmail: new FormControl(null, Validators.required),
          senderPhone: new FormControl(null, Validators.required)
        },
        { updateOn: 'blur' } // not on submit because of mask
      )
    });

    if (this.clients && this.clients.length && this.role !== Roles.CLIENT) {
      (this.form.get('destinationForm') as FormGroup).addControl(
        'clientId',
        new FormControl(this.clients[0].value, Validators.required)
      );
    }
  }

  private handleError(error: any) {
    const messages: string[] = [];

    if (error.errors && error.errors.length) {
      error.errors.forEach(field => {
        messages.push(`${field.path}: ${field.message}`);
      });
    } else if (error.message) {
      messages.push(error.message);
    }

    this.feedbackService.error(messages.join('\n'));
  }
}
