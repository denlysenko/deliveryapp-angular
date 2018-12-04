import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { ErrorsInterceptor } from './services/interceptors/errors.interceptor';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';
import { CoreFacade } from './store/core.facade';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    CoreFacade,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
