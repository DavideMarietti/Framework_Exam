import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StockChartService {

  private apiKey = 'GI9ZJ7T8NBICANYP';
  private apiUrl = 'https://www.alphavantage.co/query';

  constructor(private http: HttpClient) {}

  getStockData(symbol: string): Observable<any>{
    const url = `${this.apiUrl}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${this.apiKey}`;
    return this.http
      .get(
        url,
        {responseType: "json"}
      ).pipe(
        map(responseData => {
          console.log("responseData: ", responseData)
          let responseData_ = responseData["Time Series (Daily)"]
          const stockData: any[] = [];
          for (const key in responseData_) {
            if (responseData_.hasOwnProperty(key)) {
              let open:  number = +responseData[key]["1. open"];
              let high:  number = +responseData[key]["2. high"];
              let low:  number = +responseData[key]["3. low"];
              let close:  number = +responseData[key]["4. close"];
              let close_ad:  number = +responseData[key]["5. adjusted close"];
              let volume:  number = +responseData[key]["6. volume"];
              let dividend_am:  number = +responseData[key]["7. dividend amount"];
              let split_coef:  number = +responseData[key]["8. split coefficient"];
              stockData.push({open: open, high: high, low: low, close: close, close_ad: close_ad, volume: volume, dividend_am: dividend_am, split_coef: split_coef, data: new Date(key).getTime() });
            }
          }
          console.log("stockData: ", stockData)
          return stockData;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}
