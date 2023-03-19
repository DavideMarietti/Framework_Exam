import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { MainPageComponent } from './main-page/main-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    JumbotronComponent,
    LeftNavComponent,
    RightNavComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule
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
