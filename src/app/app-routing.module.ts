import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShellComponent } from '@app-shell/containers/app-shell/app-shell.component';

import { AuthGuard } from '@core/guards';

import { routes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: AppShellComponent,
        canActivate: [AuthGuard],
        children: [...routes]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
