import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ui/inputmask';
import { ButtonModule, InputTextModule } from 'primeng/primeng';
import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { componentDeclarations, providerDeclarations } from './profile.common';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { BankDetailsFormComponent } from './components/bank-details-form/bank-details-form.component';

@NgModule({
  declarations: [
    ...componentDeclarations,
    ContactsFormComponent,
    PasswordFormComponent,
    AddressFormComponent,
    BankDetailsFormComponent
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
