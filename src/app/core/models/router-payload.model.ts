import { NavigationExtras } from '@angular/router';

export interface RouterPayload {
  path: any[];
  query?: Object;
  extras?: NavigationExtras;
}
