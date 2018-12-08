import { NgModule } from '@angular/core';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '~/environments/environment';

import { importDeclarations, providerDeclarations } from './core.common';

@NgModule({
  imports: [
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    ...importDeclarations
  ],
  providers: [...providerDeclarations]
})
export class CoreModule {}
