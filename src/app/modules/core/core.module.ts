import { NgModule } from '@angular/core';

import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '~/environments/environment';

import { importDeclarations, providerDeclarations } from './core.common';
import { RouterExtensions } from './services/router-extensions/router-extensions.service';

@NgModule({
  imports: [
    ...importDeclarations,
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    })
  ],
  providers: [...providerDeclarations, RouterExtensions]
})
export class CoreModule {}
