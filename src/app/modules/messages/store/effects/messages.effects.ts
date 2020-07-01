import { Injectable } from '@angular/core';

import { DEFAULT_LIMIT } from '@common/constants';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MessagesService } from '../../services/messages.service';
import {
  LoadMessagesFail,
  LoadMessagesSuccess,
  LoadMore,
  MarkAsRead,
  MarkAsReadFail,
  MarkAsReadSuccess,
  MessagesActionTypes
} from '../actions/messages.actions';

@Injectable()
export class MessagesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly messagesService: MessagesService
  ) {}

  @Effect()
  loadMessages$ = this.actions$.pipe(
    ofType(MessagesActionTypes.LOAD_MESSAGES),
    switchMap(() =>
      this.messagesService
        .loadMessages({ limit: DEFAULT_LIMIT, offset: 0 })
        .pipe(
          map((res) => new LoadMessagesSuccess(res)),
          catchError((err) => of(new LoadMessagesFail(err)))
        )
    )
  );

  @Effect()
  loadMore$ = this.actions$.pipe(
    ofType(MessagesActionTypes.LOAD_MORE),
    map((action: LoadMore) => action.payload),
    switchMap((offset) =>
      this.messagesService.loadMessages({ limit: DEFAULT_LIMIT, offset }).pipe(
        map((res) => new LoadMessagesSuccess(res)),
        catchError((err) => of(new LoadMessagesFail(err)))
      )
    )
  );

  @Effect()
  markAsRead$ = this.actions$.pipe(
    ofType(MessagesActionTypes.MARK_AS_READ),
    map((action: MarkAsRead) => action.payload),
    switchMap((messageId) =>
      this.messagesService.markAsRead(messageId).pipe(
        map(() => new MarkAsReadSuccess(messageId)),
        catchError((err) => of(new MarkAsReadFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  subscribeToMessages$ = this.actions$.pipe(
    ofType(MessagesActionTypes.SUBSCRIBE_TO_MESSAGES),
    switchMap(() => from(this.messagesService.subscribeToMessaging()))
  );
}
