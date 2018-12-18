import { Roles } from './enums/roles.enum';

export const appMenu = [
  {
    link: 'orders',
    label: 'Orders',
    icon: 'fa-file-text',
    allowedRoles: [Roles.ADMIN, Roles.CLIENT, Roles.MANAGER]
  },
  {
    link: 'payments',
    label: 'Payments',
    icon: 'fa-money',
    allowedRoles: [Roles.ADMIN, Roles.CLIENT, Roles.MANAGER]
  },
  {
    link: 'users',
    label: 'Users',
    icon: 'fa-users',
    allowedRoles: [Roles.ADMIN]
  },
  {
    link: 'settings',
    label: 'Settings',
    icon: 'fa-cog',
    allowedRoles: [Roles.ADMIN]
  },
  {
    link: 'logs',
    label: 'Logs',
    icon: 'fa-database',
    allowedRoles: [Roles.ADMIN]
  }
];
