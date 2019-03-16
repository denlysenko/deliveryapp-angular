import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'da-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent {
  order = {
    name: 'Order test',
    weight: 2,
    from: 'Test'
  };
}
