import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

import {TraceEvent} from '../trace-event'
import { Page} from "../../../../tracer-client/src/page";
import {TracerEventsService} from "../tracer-events.service";

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

  //Update this function to launch a modal
  //Contents don't matter right now
  //Later, pass in a traceEvent as a parameter for all these three events
  openStepPage(event: TraceEvent):void {
    //this.pagesServices.getPageContent(this.events[2].sequenceNumber, this.events[2].primaryPageName);

    const ref = this.dialog.open(DialogOverviewExampleDialog, {
      width: "350px",
      data: {page: event.primaryPage}
    });

    ref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });


    alert("openStepPage " + event.primaryPage.properties["pxObjClass"]);
  }

  openStepDetail():void {
    alert("openStepDetail")
  }

  openRule():void  {
    alert("openRule")
  }
}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}















