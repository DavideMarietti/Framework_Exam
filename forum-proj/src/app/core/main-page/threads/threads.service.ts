import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

import {Thread, Comment, Utente} from "../../../variable-type";

@Injectable({providedIn: 'root'})
export class ThreadsService {
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

  createThread(titolo: string, testo: string, autore: string) {
    const postData = { titolo: titolo, testo: testo, autore: autore };
    return this.http
      .post<Thread>(
        'http://localhost:9191/api/v1/posts/create',
        postData
      )
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

  createComment(testo: string, autore: string, parentid: number, level: number) {
    const postData = {testo: testo, autore: autore, parentid: parentid, level: level };
    return this.http
      .post<Comment>(
        'http://localhost:9191/api/v1/comments/create',
        postData
      )
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

  deleteThread(id: number) {
    const url: string = `http://localhost:9191/api/v1/posts/${id}`;
    console.log(url);
    return this.http
      .delete(
        url,
        {responseType: 'text'}
      );
  }

  deleteComment(id: number) {
    const url: string = `http://localhost:9191/api/v1/comments/${id}`;
    console.log(url);
    return this.http
      .delete(
        url,
        {responseType: 'text'}
      );
  }

  fetchUsers() {
    return this.http
      .get<Utente[]>('http://localhost:9191/api/v1/users')
      .pipe(
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  controlLike(){

  }
}
