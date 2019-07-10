import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


import {TracerEventsService} from "../tracer-events.service";
import {TraceEvent} from '../trace-event'
import {PagesService} from "../pages.service";
import { Page} from "../../../../tracer-client/src/page";


export interface DialogData{
  page: Page;
}



@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {

  pageService: PagesService;
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



    //let localPg = this.pageService.getPageContent(2,"pxObjClass");

    const ref = this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      height: "500px",
      data: {page: event.primaryPage}
    });



    alert("openStepPage");
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















