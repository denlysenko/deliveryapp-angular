import { createSelector } from '@ngrx/store';

import { getMessagesState } from '../reducers';
import * as fromMessages from '../reducers/messages.reducer';

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

export const getMessagesCount = createSelector(
  getMessagesState,
  fromMessages.getMessagesCount
);

export const getAllMessages = createSelector(getMessageEntities, (entities) =>
  Object.keys(entities)
    .map((id) => entities[id])
    .sort(
      (a, b) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    )
);
