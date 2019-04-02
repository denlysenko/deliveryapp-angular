import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ProfileFormComponent } from './components/profile-form/profile-form.component.tns';
import { ProfileRoutingModule } from './profile-routing.module';
import { componentDeclarations, providerDeclarations } from './profile.common';

@NgModule({
  declarations: [...componentDeclarations, ProfileFormComponent],
  imports: [NativeScriptCommonModule, ProfileRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class ProfileModule {}
