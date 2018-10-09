import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '~/environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, query: any = {}): Observable<T> {
    const params = this.setParams(query);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get<T>(`${environment.apiUrl}${url}`, {
        params,
        headers
      })
      .pipe(catchError(err => throwError(err.error)));
  }

  post<T>(url: string, body: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<T>(`${environment.apiUrl}${url}`, body, { headers })
      .pipe(catchError(err => throwError(err.error)));
  }

  patch<T>(url: string, body: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .patch<T>(`${environment.apiUrl}${url}`, body, { headers })
      .pipe(catchError(err => throwError(err.error)));
  }

  private setParams(params: { [key: string]: string }): HttpParams {
    return Object.entries(params).reduce((param, [key, value]) => {
      if (value !== null) {
        return param.set(key, value);
      }

      return param;
    }, new HttpParams());
  }
}
