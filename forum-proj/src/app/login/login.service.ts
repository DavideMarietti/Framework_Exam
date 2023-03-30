import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

import {Utente} from "../variable-type";

@Injectable({providedIn: 'root'})
export class LoginService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
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
}
