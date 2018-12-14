import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppShellModule } from '@app-shell/app-shell.module';
import { CoreModule } from '@core/core.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    TNSFontIconModule.forRoot({
      fa: './fonts/font-awesome.css'
    }),
    AppRoutingModule,
    CoreModule,
    AppShellModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
