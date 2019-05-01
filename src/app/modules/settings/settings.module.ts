import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule, InputTextModule } from 'primeng/primeng';

import { components } from './components';
import { containers } from './containers';
import { SettingsResolver } from './resolvers/settings.resolver';
import { SettingsService } from './services/settings.service';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [SettingsService, SettingsResolver]
})
export class SettingsModule {}
