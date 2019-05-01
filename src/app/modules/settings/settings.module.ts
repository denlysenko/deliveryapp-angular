import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsService } from './services/settings.service';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SettingsRoutingModule],
  providers: [SettingsService]
})
export class SettingsModule {}
