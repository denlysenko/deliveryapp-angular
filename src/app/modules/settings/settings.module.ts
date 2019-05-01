import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { components } from './components';
import { containers } from './containers';
import { SettingsResolver } from './resolvers/settings.resolver';
import { SettingsService } from './services/settings.service';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [CommonModule, SettingsRoutingModule],
  providers: [SettingsService, SettingsResolver]
})
export class SettingsModule {}
