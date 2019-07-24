import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TracerEventsService} from "../tracer-events.service";
import {TraceEvent} from '../trace-event'
import { Page} from "../../../../tracer-client/src/page";
import {PageDialogComponent} from "./page-dialog/page-dialog.component";
import {TraceEventViewerComponent} from "../trace-event-viewer/trace-event-viewer.component";

export interface DialogData{
  page: Page;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: TraceEvent[];
  displayedColumns: string[] = [
    'line',
    'thread',
    'interaction',
    'rulesNumber',
    'stepMethod',
    'stepPage',
    'step',
    'eventType',
    'elapsed',
    'ruleName',
    'ruleset'];


  constructor(eventsService: TracerEventsService, public dialog: MatDialog) {
    this.events = [];
    eventsService.onTraceEvents().subscribe((result) => {
      result.forEach((traceEvent) => {
        this.events.push(traceEvent);
      });
    });
  }

  ngOnInit() {}

  //Pass in a traceEvent as a parameter for all these three events
  openStepPage(event: TraceEvent):void {
    this.dialog.open(PageDialogComponent, {
      width: "100%",
      height: "600px",
      data: {page: event.primaryPage}
    });
  }

  openStepDetail(event: TraceEvent):void {
    this.dialog.open(TraceEventViewerComponent, {
      width: "1000px",
      height: "1000px",
      data: {event: event}
  });
  }



  openRule(event: TraceEvent):void  {
    alert("openRule")
  }
}

