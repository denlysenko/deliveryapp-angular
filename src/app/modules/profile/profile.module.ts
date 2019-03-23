import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { componentDeclarations } from './profile.common';

@NgModule({
  declarations: [...componentDeclarations],
  imports: [CommonModule, ProfileRoutingModule]
})
export class ProfileModule {}
