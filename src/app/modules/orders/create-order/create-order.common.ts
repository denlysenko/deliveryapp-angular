import { UsersService } from '@users/services/users.service';

import { containers } from './containers';

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [UsersService];
