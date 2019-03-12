import { CargoFormComponent } from './cargo-form/cargo-form.component';
import { CreateOrderFormComponent } from './create-order-form/create-order-form.component';
import { DestinationFormComponent } from './destination-form/destination-form.component';
import { SenderFormComponent } from './sender-form/sender-form.component';
import { UpdateOrderFormComponent } from './update-order-form/update-order-form.component';

export const orderForms: any[] = [
  CreateOrderFormComponent,
  DestinationFormComponent,
  CargoFormComponent,
  SenderFormComponent,
  UpdateOrderFormComponent
];
