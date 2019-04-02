import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './create-order.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOrderRoutingModule {}
