import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { DropdownModule, PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { components } from './components';
import { containers } from './containers';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsResolver } from './resolvers/logs.resolver';
import { LogsService } from './services/logs.service';
import { LogsFacade, logsReducer } from './store';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('logs', logsReducer),
    LogsRoutingModule,
    DropdownModule,
    TableModule,
    PaginatorModule
  ],
  providers: [LogsService, LogsResolver, LogsFacade]
})
export class LogsModule {}
