import { NgModule } from '@angular/core';

import { AuthModule } from '@auth/auth.module';
import { CoreModule } from '@core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule, AuthModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
