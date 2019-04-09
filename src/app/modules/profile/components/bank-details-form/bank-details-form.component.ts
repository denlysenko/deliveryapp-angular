import { Component, Input } from '@angular/core';

@Component({
  selector: 'da-bank-details-form',
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.scss']
})
export class BankDetailsFormComponent {
  @Input() form: any;
}
