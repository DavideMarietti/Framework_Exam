import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';



@Component({
  selector: 'app-stock-chart',
  template: '<div class="chart-container" [id]="chartId"></div>',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {
  @Input() stockData: any;

  chartId = 'stock-chart';

  constructor() { }

  ngOnInit(): void {
    const seriesData: { x: number, y: number }[] = [];

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
