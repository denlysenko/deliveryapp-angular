import { RouterModule } from '@angular/router';

import { components } from './components';
import { containers } from './containers';

export const componentDeclarations: any[] = [...containers, ...components];

export const importDeclarations: any[] = [RouterModule];
