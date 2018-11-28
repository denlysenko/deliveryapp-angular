import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { MESSAGE_SUBJECT } from '@common/constants';
import { MessageService } from 'primeng/components/common/messageservice';

import { AuthService } from '../../services/auth.service';
import {
  HandleMessageReceive,
  LoadMessagesFail,
  LoadMessagesSuccess,
  MessagesActionTypes,
} from '../actions/messages.actions';

// import { MessagesService } from '../../../lib/messages/messages.service';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    // private messagesService: MessagesService,
    private messageService: MessageService
  ) {}

  @Effect()
  loadMessages$ = this.actions$.ofType(MessagesActionTypes.LOAD_MESSAGES).pipe(
    switchMap(() => {
      return this.authService.loadMessages().pipe(
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
  handleMessageReceive$ = this.actions$
    .ofType(MessagesActionTypes.HANDLE_MESSAGE_RECEIVE)
    .pipe(
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
          return this.messageService.add({
            severity: 'info',
            summary: MESSAGE_SUBJECT,
            detail: message.text
          });
        }
      })
    );
}
