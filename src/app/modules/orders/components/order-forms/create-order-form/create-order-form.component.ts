import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

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

  ngOnInit() {}
}
