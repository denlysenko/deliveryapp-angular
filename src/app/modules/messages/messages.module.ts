import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from '@ui/infinite-scroll';

import { TooltipModule } from 'primeng/tooltip';

import { MessagesComponent } from './components/messages/messages.component';
import { importDeclarations, providerDeclarations } from './messages.common';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    ...importDeclarations,
    InfiniteScrollModule,
    TooltipModule
  ],
  exports: [MessagesComponent],
  providers: [...providerDeclarations]
})
export class MessagesModule {}
