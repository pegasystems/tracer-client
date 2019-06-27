import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {StatusBarComponent} from "./status-bar/status-bar.component";
import {EventListComponent} from "./event-list/event-list.component";
import {StatusBarLeftComponent} from "./status-bar/status-bar-left/status-bar-left.component";
import {StatusBarRightComponent} from "./status-bar/status-bar-right/status-bar-right.component";
import { PageViewerComponent } from './page-viewer/page-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StatusBarComponent,
    EventListComponent,
    StatusBarLeftComponent,
    StatusBarRightComponent,
    PageViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
