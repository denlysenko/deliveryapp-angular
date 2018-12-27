import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ACCESS_TOKEN, AUTHORIZATION_HEADER } from '@common/constants';

import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  headerName = AUTHORIZATION_HEADER;

  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getItem(ACCESS_TOKEN);

    if (token) {
      request = request.clone({
        setHeaders: {
          [this.headerName]: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
