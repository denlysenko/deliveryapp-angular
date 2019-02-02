import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { MESSAGE_SUBJECT } from '@common/constants';

import { FeedbackService } from '../../services/feedback/feedback.service';
import { UserSelfService } from '../../services/user-self/user-self.service';
import {
  HandleMessageReceive,
  LoadMessagesFail,
  LoadMessagesSuccess,
  MessagesActionTypes
} from '../actions/messages.actions';

// tslint:disable-next-line:no-commented-code
// import { MessagesService } from '../../../lib/messages/messages.service';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private userSelfService: UserSelfService,
    // private messagesService: MessagesService,
    private feedbackService: FeedbackService
  ) {}

  @Effect()
  loadMessages$ = this.actions$.pipe(
    ofType(MessagesActionTypes.LOAD_MESSAGES),
    switchMap(() => {
      return this.userSelfService.loadMessages().pipe(
        map(messages => new LoadMessagesSuccess(messages)),
        catchError(err => of(new LoadMessagesFail(err)))
      );
    })
  );

  // @Effect({ dispatch: false })
  // markAsRead$ = this.actions$
  //   .ofType(messagesActions.MARK_AS_READ)
  //   .pipe(
  //     map((action: messagesActions.MarkAsRead) => action.payload),
  //     tap(messageId => this.messagesService.markAsRead(messageId))
  //   );

  @Effect({ dispatch: false })
  handleMessageReceive$ = this.actions$.pipe(
    ofType(MessagesActionTypes.HANDLE_MESSAGE_RECEIVE),
    map((action: HandleMessageReceive) => action.payload),
    tap(message => {
      if (
        'Notification' in window &&
        Notification['permission'] === 'granted'
      ) {
        return new Notification(MESSAGE_SUBJECT, {
          body: message.text
        });
      } else {
        return this.feedbackService.info(message.text);
      }
    })
  );
}
