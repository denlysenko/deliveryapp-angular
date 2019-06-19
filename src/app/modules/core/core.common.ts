import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '@auth/auth.module';

import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { clearState, CoreFacade, reducers } from './store';
import { effects } from './store/effects';

export const importDeclarations: any[] = [
  StoreModule.forRoot(reducers, {
    metaReducers: [clearState],
    runtimeChecks: {
      strictStateImmutability: false
    }
  }),
  EffectsModule.forRoot(effects),
  AuthModule
];

export const providerDeclarations: any[] = [
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
];
