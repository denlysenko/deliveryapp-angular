import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from '@auth/auth.module';
import { CoreModule } from '@core/core.module';
import { MessageService } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    AppRoutingModule,
    CoreModule,
    AuthModule
  ],
  declarations: [AppComponent],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
