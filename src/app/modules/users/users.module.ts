import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { InputMaskModule } from '@ui/inputmask';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { components } from './components';
import { containers } from './containers';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersFacade, usersReducer } from './store';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', usersReducer),
    ReactiveFormsModule,
    UsersRoutingModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    PaginatorModule,
    InputMaskModule
  ],
  providers: [UsersResolver, UsersFacade]
})
export class UsersModule {}
