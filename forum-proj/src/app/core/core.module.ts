import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RightNavComponent } from './right-nav/right-nav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    JumbotronComponent,
    LeftNavComponent,
    RightNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    JumbotronComponent
  ]
})
export class CoreModule { }
