import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './orders.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
