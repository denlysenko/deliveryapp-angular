import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, retryWhen } from 'rxjs/operators';

import { HTTP_RETRY_COUNT, HTTP_RETRY_DELAY, HTTP_STATUS, SERVER_ERRORS } from '@common/constants';

import { FeedbackService } from '../feedback/feedback.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private feedbackService: FeedbackService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retryWhen(errors =>
        errors.pipe(
          // Use concat map to keep the errors in order and make sure they
          // aren't executed in parallel
          concatMap((error, count) => {
            if (
              count <= HTTP_RETRY_COUNT &&
              (error.status === HTTP_STATUS.SERVICE_UNAVAILABLE ||
                error.status === HTTP_STATUS.GATEWAY_TIMEOUT)
            ) {
              // Otherwise we pipe this back into our stream and delay the retry
              return of(error);
            }
            // If the condition is true we throw the error (the last error)
            return throwError(error);
          }),
          delay(HTTP_RETRY_DELAY)
        )
      ),
      catchError(event => {
        if (event instanceof HttpErrorResponse) {
          let msg;

          switch (event.status) {
            case HTTP_STATUS.NO_CONNECTION:
              msg = SERVER_ERRORS.NO_CONNECTION;
              break;
            case HTTP_STATUS.UNAUTHORIZED:
            case HTTP_STATUS.METHOD_NOT_ALLOWED:
              msg = SERVER_ERRORS.UNAUTHORIZED;
              break;
            case HTTP_STATUS.FORBIDDEN:
              msg = SERVER_ERRORS.FORBIDDEN;
              break;
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
            case HTTP_STATUS.BAD_GATEWAY:
            case HTTP_STATUS.SERVICE_UNAVAILABLE:
              msg = SERVER_ERRORS.INTERNAL_SERVER_ERROR;
              break;
          }

          if (msg) {
            this.feedbackService.error(msg);
          }

          return throwError(event);
        }
      })
    );
  }
}
