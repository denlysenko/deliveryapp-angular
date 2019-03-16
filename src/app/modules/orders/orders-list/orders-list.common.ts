import { ReactiveFormsModule } from '@angular/forms';

import { containers } from './containers';

import { OrdersResolver } from './resolvers/orders.resolver';

export const importDeclarations: any[] = [ReactiveFormsModule];

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [OrdersResolver];
