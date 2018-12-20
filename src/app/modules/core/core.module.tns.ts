import { NgModule } from '@angular/core';

import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router';

import { importDeclarations, providerDeclarations } from './core.common';
import { RouterExtensions } from './services/router-extensions/router-extensions.service';

@NgModule({
  imports: [...importDeclarations],
  providers: [
    ...providerDeclarations,
    {
      provide: RouterExtensions,
      useClass: TNSRouterExtensions
    }
  ]
})
export class CoreModule {}
