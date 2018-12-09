import { RouterModule } from '@angular/router';

import { containers } from './containers';

export const componentDeclarations: any[] = [...containers];

export const importDeclarations: any[] = [RouterModule];
