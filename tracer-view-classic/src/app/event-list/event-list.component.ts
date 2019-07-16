import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TracerEventsService} from "../tracer-events.service";
import {TraceEvent} from '../trace-event'
import { Page} from "../../../../tracer-client/src/page";
import {PageDialogComponent} from "./page-dialog/page-dialog.component";

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
      width: "500px",
      height: "500px",
      data: {page: event.primaryPage}
    });
  }

  openStepDetail():void {
    alert("openStepDetail")
  }

  openRule():void  {
    alert("openRule")
  }
}

