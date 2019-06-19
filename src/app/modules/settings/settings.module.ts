import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

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
    ButtonModule,
    TabViewModule
  ],
  providers: [SettingsService, SettingsResolver]
})
export class SettingsModule {}
