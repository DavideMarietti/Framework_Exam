import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { ErrorComponent } from './error/error.component';
import {CoreModule} from "./core/core.module";
/*import { StockChartComponent } from './stock-chart/stock-chart.component';*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent/*,
    StockChartComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
