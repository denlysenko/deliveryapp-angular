import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { componentDeclarations, providerDeclarations } from './profile.common';

@NgModule({
  declarations: [...componentDeclarations],
  imports: [CommonModule, ProfileRoutingModule],
  providers: [...providerDeclarations]
})
export class ProfileModule {}
