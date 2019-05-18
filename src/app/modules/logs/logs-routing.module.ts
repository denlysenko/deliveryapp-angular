import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './logs.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule {}
