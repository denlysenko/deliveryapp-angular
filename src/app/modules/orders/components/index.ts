import { OrdersFilterComponent } from './orders-filter/orders-filter.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { orderForms } from './order-forms';

export const components: any[] = [
  OrdersListComponent,
  OrdersFilterComponent,
  ...orderForms
];
