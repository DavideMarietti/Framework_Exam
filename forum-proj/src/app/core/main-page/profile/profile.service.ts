import { Injectable } from '@angular/core';
import {Comment, Thread} from "../../../variable-type";
import {catchError, map} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchThreads() {
    return this.http
      .get<Thread[]>('http://localhost:9191/api/v1/posts')
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
      .get<Comment[]>('http://localhost:9191/api/v1/comments')
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
