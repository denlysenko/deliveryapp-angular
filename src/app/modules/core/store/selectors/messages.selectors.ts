import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMessages from '../reducers/messages.reducer';

export const getMessagesLoading = createSelector(
  fromFeature.getMessagesState,
  fromMessages.getMessagesLoading
);

export const getMessagesError = createSelector(
  fromFeature.getMessagesState,
  fromMessages.getMessagesError
);

export const getMessageEntities = createSelector(
  fromFeature.getMessagesState,
  fromMessages.getMessageEntities
);

export const getUnreadMessages = createSelector(
  fromFeature.getMessagesState,
  fromMessages.getUnreadMessages
);

export const getAllMessages = createSelector(
  getMessageEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
