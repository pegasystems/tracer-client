import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {StatusBarComponent} from "./status-bar/status-bar.component";
import {EventListComponent} from "./event-list/event-list.component";
import {StatusBarLeftComponent} from "./status-bar/status-bar-left/status-bar-left.component";
import {StatusBarRightComponent} from "./status-bar/status-bar-right/status-bar-right.component";
import { PageViewerComponent } from './page-viewer/page-viewer.component';
import { PageDialogComponent } from './event-list/page-dialog/page-dialog.component';
import {MatTreeModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StatusBarComponent,
    EventListComponent,
    StatusBarLeftComponent,
    StatusBarRightComponent,
    PageViewerComponent,
    PageDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    MatTreeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PageDialogComponent]
})

export class AppModule {}
