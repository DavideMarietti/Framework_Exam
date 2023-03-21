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



@NgModule({
  declarations: [
    HeaderComponent,
    JumbotronComponent,
    LeftNavComponent,
    RightNavComponent,
    MainPageComponent,
    ThreadsComponent,
    GraphsComponent,
    ProfileComponent
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
