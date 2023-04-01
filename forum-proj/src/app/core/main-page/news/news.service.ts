import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'GI9ZJ7T8NBICANYP';
  private apiUrl = 'https://www.alphavantage.co/query';

  constructor(private http: HttpClient) {}

  getNews(symbol: string): Observable<any>{
    const url = `${this.apiUrl}?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${this.apiKey}`;
    console.log(this.http.get(url));
    return this.http
      .get(
        url,
        {responseType: "json"}
      )
  }
}
