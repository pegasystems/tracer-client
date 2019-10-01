import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {StatusBarComponent} from "./components/status-bar/status-bar.component";
import {EventListComponent} from "./components/event-list/event-list.component";
import {StatusBarLeftComponent} from "./components/status-bar/status-bar-left/status-bar-left.component";
import {StatusBarRightComponent} from "./components/status-bar/status-bar-right/status-bar-right.component";
import { PageViewerComponent } from './components/page-viewer/page-viewer.component';
import { PageDialogComponent } from './components/event-list/page-dialog/page-dialog.component';
import { TraceEventViewerComponent } from './components/trace-event-viewer/trace-event-viewer.component';
import { TraceEventDialogComponent } from './components/event-list/trace-event-dialog/trace-event-dialog.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsDialogComponent } from './components/toolbar/settings-dialog/settings-dialog.component';
import { ConnectionsDialogComponent } from './components/toolbar/connections-dialog/connections-dialog.component';
import { SaveDialogComponent } from './components/toolbar/save-dialog/save-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StatusBarComponent,
    EventListComponent,
    StatusBarLeftComponent,
    StatusBarRightComponent,
    PageViewerComponent,
    PageDialogComponent,
    TraceEventViewerComponent,
    TraceEventDialogComponent,
    SettingsComponent,
    SettingsDialogComponent,
    ConnectionsDialogComponent,
    SaveDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SaveDialogComponent, SettingsDialogComponent, ConnectionsDialogComponent, PageDialogComponent, TraceEventDialogComponent, TraceEventViewerComponent]
})

export class AppModule {}
