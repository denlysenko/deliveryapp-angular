import { Component, Input } from '@angular/core';

@Component({
  selector: 'da-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  @Input() form: any;
}
