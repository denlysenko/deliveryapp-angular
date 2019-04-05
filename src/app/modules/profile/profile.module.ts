import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from '@ui/inputmask';
import { ButtonModule, InputTextModule } from 'primeng/primeng';

import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { componentDeclarations, providerDeclarations } from './profile.common';

@NgModule({
  declarations: [
    ...componentDeclarations,
    ContactsFormComponent,
    PasswordFormComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule
  ],
  providers: [...providerDeclarations],
  exports: [PasswordFormComponent]
})
export class ProfileModule {}
