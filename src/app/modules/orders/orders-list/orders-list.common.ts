import { ReactiveFormsModule } from '@angular/forms';

import { OrdersResolver } from './resolvers/orders.resolver';

export const importDeclarations: any[] = [ReactiveFormsModule];

export const providerDeclarations: any[] = [OrdersResolver];
