import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShellComponent } from '@app-shell/containers/app-shell/app-shell.component';

import { routes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: AppShellComponent,
        children: [...routes]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
