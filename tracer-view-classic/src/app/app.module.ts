import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {StatusBarComponent} from "./status-bar/status-bar.component";
import {DialogOverviewExampleDialog, EventListComponent} from "./event-list/event-list.component";
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
    PageViewerComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog]
})

export class AppModule {}
