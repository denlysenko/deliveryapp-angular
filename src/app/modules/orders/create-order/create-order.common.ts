import { UsersService } from '@users/services/users.service';

import { containers } from './containers';
import { ClientsResolver } from './resolvers/clients.resolver';

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [ClientsResolver, UsersService];
