import {Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

import {StockChartService} from "../../../../../stock-chart/stock-chart.service";

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5stock from '@amcharts/amcharts5/stock';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnDestroy, OnInit {
  private root!: am5.Root;
  private stockData: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private http: HttpClient, private stockchartService: StockChartService) {
  }

  ngOnInit(): void {
    lastValueFrom(this.stockchartService.getStockData('IBM')).then(
      stockdata => {
        this.stockData = stockdata;
      }).then(() => {
      this.renderChart();
    });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  renderChart() {
    // Chart code goes in here
    this.browserOnly(() => {
      // Create root element
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("chartdiv1");


      // Set themes
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Dark.new(root)
      ]);


      // Create a stock chart
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating_the_chart
      let stockChart = root.container.children.push(am5stock.StockChart.new(root, {}));


      // Set global number format
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
      root.numberFormatter.set("numberFormat", "#,###.00");


      // Create a main stock panel (chart)
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding_panels
      let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true
      }));


      // title
      var title = mainPanel.plotContainer.children.push(am5.Label.new(root, {
        text: "Stock Charts with Relative Indexes",
        fontSize: 20,
        fontWeight: "400",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }))

      // Create value axis
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom"
        }),
        extraMin: 0.1, // adds some space for main series
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: "#,###.00",
        extraTooltipPrecision: 2
      }));

      let dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));


      // Add series
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
        name: "MSFT",
        clustered: false,
        valueXField: "data",
        valueYField: "4. close",
        highValueYField: "2. high",
        lowValueYField: "3. low",
        openValueYField: "1. open",
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
        legendRangeValueText: ""
      }));


      // Set main value series
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
      stockChart.set("stockSeries", valueSeries);


      // Add a stock legend
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
      let valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
        stockChart: stockChart
      }));


      // Create volume axis
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
        inside: true
      });

      volumeAxisRenderer.labels.template.set("forceHidden", true);
      volumeAxisRenderer.grid.template.set("forceHidden", true);

      let volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
        numberFormat: "#.#a",
        height: am5.percent(20),
        y: am5.percent(100),
        centerY: am5.percent(100),
        renderer: volumeAxisRenderer
      }));

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
        name: "6. volume",
        clustered: false,
        valueXField: "data",
        valueYField: "6. volume",
        xAxis: dateAxis,
        yAxis: volumeValueAxis,
        legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]"
      }));

      volumeSeries.columns.template.setAll({
        strokeOpacity: 0,
        fillOpacity: 0.5
      });

      // color columns by stock rules
      volumeSeries.columns.template.adapters.add("fill", function (fill, target) {
        let dataItem = target.dataItem;
        if (dataItem) {
          return stockChart.getVolumeColor(dataItem);
        }
        return fill;
      })


      // Set main series
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
      stockChart.set("volumeSeries", volumeSeries);
      valueLegend.data.setAll([valueSeries, volumeSeries]);


      // Add cursor(s)
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      mainPanel.set("cursor", am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: "y!"
      }));


      // Add scrollbar
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      let scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50
      }));
      stockChart.toolsContainer.children.push(scrollbar);

      let sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {})
      }));

      let sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      // add Bollinger Bands indicator
      var bollingerBands = stockChart.indicators.push(am5stock.BollingerBands.new(root, {
        stockChart: stockChart,
        stockSeries: valueSeries,
      }));

      stockChart.indicators.push(am5stock.DisparityIndex.new(root, {
        stockChart: stockChart,
        stockSeries: valueSeries,
      }));

      stockChart.indicators.push(am5stock.MACD.new(root, {
        stockChart: stockChart,
        stockSeries: valueSeries,
      }));

      stockChart.indicators.push(am5stock.StandardDeviation.new(root, {
        stockChart: stockChart,
        stockSeries: valueSeries,
      }));

      stockChart.indicators.push(am5stock.WilliamsR.new(root, {
        stockChart: stockChart,
        stockSeries: valueSeries,
      }));


      let sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
        valueYField: "4. close",
        valueXField: "data",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis
      }));

      sbSeries.fills.template.setAll({
        visible: true,
        fillOpacity: 0.3
      });

      // add indicator
      stockChart.indicators.push(am5stock.RelativeStrengthIndex.new(root, {
        stockChart: stockChart,
        stockSeries: valueSeries
      }));

      // zoom to some period
      let periodSelector = am5stock.PeriodSelector.new(root, {
        stockChart: stockChart
      })

      valueSeries.events.on("datavalidated", function () {
        periodSelector.selectPeriod({timeUnit: "month", count: 3})
      })


      // Stock toolbar
      // -------------------------------------------------------------------------------
      // https://www.amcharts.com/docs/v5/charts/stock/toolbar/

      let toolbar = am5stock.StockToolbar.new(root, {
        // @ts-ignore
        container: document.getElementById("chartcontrols"),
        stockChart: stockChart,
        controls: [
          am5stock.IndicatorControl.new(root, {
            stockChart: stockChart,
            legend: valueLegend
          }),
          am5stock.DateRangeSelector.new(root, {
            stockChart: stockChart
          }),
          periodSelector,
          am5stock.ResetControl.new(root, {
            stockChart: stockChart
          }),
          am5stock.SettingsControl.new(root, {
            stockChart: stockChart
          })
        ]
      })

// data
      //let data = [ {Date: 1617192000000, Open: 515.67, High: 528.13, Low: 515.44, Close: 521.66, Volume: 3503100} ];
      let pippo = {
        "1. open": 129.47,
        "2. high": 131.23,
        "3. low": 129.42,
        "4. close": 131.09,
        "5. adjusted close": 131.09,
        "6. volume": 4524686,
        "7. dividend amount": 0,
        "8. split coefficient": 1,
        "data": 1680220800000
      }
      let data = this.stockData;

      // set data to all series
      valueSeries.data.setAll(data);
      volumeSeries.data.setAll(data);
      sbSeries.data.setAll(data);
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
