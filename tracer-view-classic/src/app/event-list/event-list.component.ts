import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TracerEventsService} from "../tracer-events.service";
import {TraceEvent} from '../trace-event'
import {PageDialogComponent} from "./page-dialog/page-dialog.component";
import {TraceEventDialogComponent} from "./trace-event-dialog/trace-event-dialog.component";
import { Page} from "../../../../tracer-client/src/page";


export interface PageDialogData{
  page: Page;
}

export interface TraceEventDialogData{
  event: TraceEvent;
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
      width: "1000px",
      height: "600px",
      data: {page: event.primaryPage}
    });
  }

  openStepDetail(event: TraceEvent):void {
    this.dialog.open(TraceEventDialogComponent, {
      width: "1000px",
      height: "600px",
      data: {event: event}
  });
  }



  openRule(event: TraceEvent):void  {
    alert("openRule")
  }
}

