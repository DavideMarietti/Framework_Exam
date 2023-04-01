import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ThreadsComponent } from './main-page/threads/threads.component';
import { GraphsComponent } from './main-page/graphs/graphs.component';
import { ProfileComponent } from './main-page/profile/profile.component';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import {FormsModule} from "@angular/forms";
import { NewsComponent } from './main-page/news/news.component';
import { Chart1Component } from './main-page/graphs/chart-list/chart1/chart1.component';



@NgModule({
  declarations: [
    HeaderComponent,
    JumbotronComponent,
    LeftNavComponent,
    RightNavComponent,
    MainPageComponent,
    ThreadsComponent,
    GraphsComponent,
    ProfileComponent,
    StockChartComponent,
    NewsComponent,
    Chart1Component
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    JumbotronComponent,
    LeftNavComponent,
    RightNavComponent,
    MainPageComponent
  ]
})
export class CoreModule { }
