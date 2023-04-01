import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ThreadsService} from "../core/main-page/threads/threads.service";

@Injectable({
  providedIn: 'root'
})
export class StockChartService {

  private apiKey = 'GI9ZJ7T8NBICANYP';
  private apiUrl = 'https://www.alphavantage.co/query';

  constructor(private http: HttpClient) {}

  getStockData(symbol: string): Observable<any>{
    const url = `${this.apiUrl}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${this.apiKey}`;
    console.log(this.http.get(url));
    return this.http
      .get(
        url,
        {responseType: "json"}
      )
  }
}
