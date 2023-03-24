import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-stock-chart',
  template: '<div class="chart-container" [id]="chartId"></div>',
  styleUrls: ['./stock-chart.component.css']
})


export class StockChartComponent implements OnInit {

  private  stockData: any; 
  /*@Input() stockData: any;*/

  private apiKey = 'GI9ZJ7T8NBICANYP';
  private apiUrl = 'https://www.alphavantage.co/query';
  private http: HttpClient
  chartId = 'stock-chart';

  getStockData(symbol: string): Observable<any> {
    const url = `${this.apiUrl}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${this.apiKey}`;
    console.log(this.http.get(url)); 
    return this.http.get(url);
  }

  constructor() { }

  ngOnInit(): void {
    const seriesData: { x: number, y: number }[] = [];

    
    this.stockData = this.getStockData('SPY')
    console.log(this.stockData); 
    console.log("ciao");

    Object.keys(this.stockData).forEach(date => {
      const dataPoint = {
        x: new Date(date).getTime(),
        y: parseFloat(this.stockData[date]['4. close'])
      };
      seriesData.push(dataPoint);
    });

    console.log("ciao post");

    const chartOptions: Highcharts.Options = {
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      series: [{
        type: 'line',
        data: seriesData
      }]
    };

    Highcharts.chart(this.chartId, chartOptions);
  }
}
