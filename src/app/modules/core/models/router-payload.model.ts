import { NavigationExtras } from '@angular/router';

export interface ExtendedNavigationExtras extends NavigationExtras {
  clearHistory?: boolean;
  animated?: boolean;
  transition?: {
    name?: string;
    instance?: any;
    duration?: number;
    curve?: any;
  };
}

export interface RouterPayload {
  path: any[];
  query?: Object;
  extras?: ExtendedNavigationExtras;
}
