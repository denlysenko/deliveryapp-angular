import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { UserViewComponent } from './user-view.component';

@NgModule({
  declarations: [UserViewComponent],
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [UserViewComponent]
})
export class UserViewModule {}
