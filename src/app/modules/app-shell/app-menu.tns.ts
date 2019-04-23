import { Roles } from '@common/enums';
import { AppMenuItem } from '@common/models';

export const appMenu: AppMenuItem[] = [
  {
    link: '/orders',
    label: 'Orders',
    icon: 'fa-file-text',
    allowedRoles: [Roles.ADMIN, Roles.CLIENT, Roles.MANAGER]
  },
  {
    link: '/payments',
    label: 'Payments',
    icon: 'fa-money',
    allowedRoles: [Roles.ADMIN, Roles.CLIENT, Roles.MANAGER]
  }
];
