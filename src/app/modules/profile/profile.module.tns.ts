import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { componentDeclarations } from './profile.common';

@NgModule({
  declarations: [...componentDeclarations],
  imports: [NativeScriptCommonModule, ProfileRoutingModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule {}
