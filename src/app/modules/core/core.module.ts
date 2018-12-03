import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { ApiService } from './services/api.service';
import { FeedbackService } from './services/feedback/feedback.service';
import { StorageService } from './services/storage/storage.service';
import { CoreFacade } from './store/core.facade';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [ApiService, FeedbackService, StorageService, CoreFacade]
})
export class CoreModule {}
