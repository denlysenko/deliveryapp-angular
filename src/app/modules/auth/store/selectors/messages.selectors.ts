import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMessages from '../reducers/messages.reducer';

export const getMessagesState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthFeatureState) => state.messages
);

export const getMessagesLoading = createSelector(
  getMessagesState,
  fromMessages.getMessagesLoading
);

export const getMessagesError = createSelector(
  getMessagesState,
  fromMessages.getMessagesError
);

export const getMessageEntities = createSelector(
  getMessagesState,
  fromMessages.getMessageEntities
);

export const getUnreadMessages = createSelector(
  getMessagesState,
  fromMessages.getUnreadMessages
);

export const getAllMessages = createSelector(
  getMessageEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
