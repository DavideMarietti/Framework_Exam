import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import {CoreModule} from "./core/core.module";
import { SignInComponent } from './sign-in/sign-in.component';
/*import { StockChartComponent } from './stock-chart/stock-chart.component';*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    SignInComponent/*,
    StockChartComponent*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
