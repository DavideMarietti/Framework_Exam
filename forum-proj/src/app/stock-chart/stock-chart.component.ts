import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { HttpClient } from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';
import { Injectable } from '@angular/core';

import {StockChartService} from "./stock-chart.service";


@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})


export class StockChartComponent implements OnInit{

  private symbol: string[] = ['IBM', 'TSCO'];
  private  stockData: any[] = [];
  /*chartId = 'stock-chart';*/

  constructor(private http: HttpClient, private stockchartService: StockChartService) { }

  ngOnInit(): void {
    /*
    for(let sym of this.symbol){
      lastValueFrom(this.stockchartService.getStockData(sym)).then(
        stockdata => {
          this.stockData.push(stockdata);
        });
    }
*/
    /*Object.keys(this.stockData).forEach(date => {
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

    Highcharts.chart(this.chartId, chartOptions);*/
  }
}
