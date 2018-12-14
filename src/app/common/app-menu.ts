import { Roles } from './enums/roles.enum';

export const appMenu = [
  {
    link: 'orders',
    label: 'Orders',
    icon: 'file-text',
    allowedRoles: [Roles.ADMIN, Roles.CLIENT, Roles.MANAGER]
  },
  {
    link: 'payments',
    label: 'Payments',
    icon: 'money',
    allowedRoles: [Roles.ADMIN, Roles.CLIENT, Roles.MANAGER]
  },
  {
    link: 'users',
    label: 'Users',
    icon: 'users',
    allowedRoles: [Roles.ADMIN]
  },
  {
    link: 'settings',
    label: 'Settings',
    icon: 'cog',
    allowedRoles: [Roles.ADMIN]
  },
  {
    link: 'logs',
    label: 'Logs',
    icon: 'database',
    allowedRoles: [Roles.ADMIN]
  }
];
