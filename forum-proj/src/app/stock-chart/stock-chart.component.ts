import {Component, AfterViewInit, Inject, PLATFORM_ID, NgZone, OnDestroy} from '@angular/core';

import {isPlatformBrowser} from "@angular/common";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Micro from "@amcharts/amcharts5/themes/Micro";


@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})


export class StockChartComponent implements OnDestroy, AfterViewInit {

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      /* Chart code */
      let tickers = [
        "AAPL", "ADBE", "ADSK", "AMD", "AMZN", "ATVI", "CRM", "CSCO", "COIN", "DELL",
        "DOCU", "EA", "EBAY", "FB", "GOOG", "HOOD", "IBM", "INTC", "MSFT", "NET",
        "NFLX", "NVDA", "ORCL", "PLTR", "PYPL", "ROKU", "SAP", "SHOP", "SNAP",
        "SONY", "STX", "T", "TSLA", "TSM", "TWTR", "U", "UBER", "VMW", "WDC", "ZM"
      ];

      for (var i = 0; i < tickers.length; i++) {
        let ticker = tickers[i];
        let positive = am5.color(0x50b300);
        let negative = am5.color(0xb30000);

        let data = generateData(20);
        // @ts-ignore
        let change = Math.round((data[data.length - 1].value / data[0].value - 1) * 1000) / 10;
        let color = change < 0 ? negative : positive;

        let div = document.getElementById("stock-chart-div");
        // @ts-ignore
        div.style.overflow = "auto";

        let row = document.createElement("div");
        row.style.borderBottom = "1px solid #7D8597";
        row.style.clear = "left";
        // @ts-ignore
        div.appendChild(row);

        let col1 = document.createElement("div");
        col1.innerHTML = ticker;
        col1.style.fontSize = "1em";
        col1.style.width = "20%";
        col1.style.height = "40px";
        col1.style.lineHeight = "40px";
        col1.style.float = "left";
        row.appendChild(col1);

        let col2 = document.createElement("div");
        col2.innerHTML = change + "%";
        col2.style.fontSize = "1em";
        col2.style.width = "20%";
        col2.style.height = "40px";
        col2.style.lineHeight = "40px";
        col2.style.float = "left";
        col2.style.color = color.toCSSHex();
        col2.style.textAlign = "center";
        row.appendChild(col2);

        let col3 = document.createElement("div");
        col3.style.fontSize = "2em";
        col3.style.width = "60%";
        col3.style.height = "40px";
        col3.style.lineHeight = "40px";
        col3.style.float = "left";
        row.appendChild(col3);
        createValueChart(col3, data, color);
      }

      // Generate random data
      function generateData(count) {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        let value = Math.round(Math.random() * 100);
        let volume = Math.round(Math.random() * 10000);

        let data = [];
        for (var i = 0; i < count; ++i) {
          value = Math.round((Math.random() * 6 - 3) + value);
          volume = Math.round((Math.random() * 1000 - 500) + volume);
          if (volume < 0) {
            volume = 0;
          }
          am5.time.add(date, "day", 1);
          // @ts-ignore
          data.push({
            date: date.getTime(),
            value: value,
            volume: volume
          });
        }
        return data;
      }


      function createValueChart(div, data, color) {
        let root = am5.Root.new(div);

        root.setThemes([
          am5themes_Micro.new(root)
        ]);

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none"
        }));

        chart.plotContainer.set("wheelable", false);
        chart.zoomOutButton.set("forceHidden", true);

        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
          maxDeviation: 0,
          baseInterval: {timeUnit: "day", count: 1},
          renderer: am5xy.AxisRendererX.new(root, {})
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          strictMinMax: true,
          extraMax: 0.02,
          extraMin: 0.02,
          renderer: am5xy.AxisRendererY.new(root, {})
        }));


        let series = chart.series.push(am5xy.LineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          stroke: color
        }));

        series.strokes.template.setAll({
          strokeWidth: 2
        });

        series.data.setAll(data);
      }
/*
      function createVolumeChart(div, data) {
        let root = am5.Root.new(div);

        root.setThemes([
          am5themes_Micro.new(root)
        ]);

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none"
        }));

        chart.plotContainer.set("wheelable", false);
        chart.zoomOutButton.set("forceHidden", true);

        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
          maxDeviation: 0,
          baseInterval: {timeUnit: "day", count: 1},
          renderer: am5xy.AxisRendererX.new(root, {})
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        }));


        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "volume",
          valueXField: "date",
          fill: am5.color(0x999999)
        }));

        series.data.setAll(data);
      }

 */
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
