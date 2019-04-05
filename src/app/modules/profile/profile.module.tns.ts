import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

import { ContactsFormComponent } from './components/contacts-form/contacts-form.component.tns';
import { PasswordFormComponent } from './components/password-form/password-form.component.tns';
import { ProfileFormComponent } from './components/profile-form/profile-form.component.tns';
import { ProfileRoutingModule } from './profile-routing.module';
import { componentDeclarations, providerDeclarations } from './profile.common';

@NgModule({
  declarations: [
    ...componentDeclarations,
    ProfileFormComponent,
    ContactsFormComponent,
    PasswordFormComponent
  ],
  imports: [
    NativeScriptCommonModule,
    ProfileRoutingModule,
    NativeScriptUIDataFormModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class ProfileModule {}
