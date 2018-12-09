import { Routes } from '@angular/router';

import { AppShellComponent } from '@app-shell/containers';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard]
  }
];
