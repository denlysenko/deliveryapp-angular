import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { UsersFacade, usersReducer } from './store';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', usersReducer),
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  providers: [UsersService, UsersResolver, UsersFacade]
})
export class UsersModule {}
