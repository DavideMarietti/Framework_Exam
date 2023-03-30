import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

import {Thread, Comment} from "../../../variable-type";

@Injectable({providedIn: 'root'})
export class ThreadsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchThreads() {
    return this.http
      .get<Thread[]>('http://localhost:8081/api/v1/posts')
      .pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  fetchComments() {
    return this.http
      .get<Comment[]>('http://localhost:8082/api/v1/comments')
      .pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}
