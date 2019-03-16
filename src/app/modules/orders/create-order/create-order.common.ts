import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { containers } from './containers';
import { CreateOrderPageComponent } from './containers/create-order-page/create-order-page.component';

import { ClientsResolver } from './resolvers/clients.resolver';
import { UsersService } from '@users/services/users.service';

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [ClientsResolver, UsersService];

export const importDeclarations: any[] = [ReactiveFormsModule];

export const routes: Routes = [
  {
    path: '',
    component: CreateOrderPageComponent,
    resolve: {
      clients: ClientsResolver
    },
    canActivate: [AuthGuard]
  }
];
