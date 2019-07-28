import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TraceEvent} from "../../../../../tracer-client/src/trace-event";

export interface TraceEventDialogData{
  event: TraceEvent;
}

@Component({
  selector: 'app-trace-event-dialog',
  templateUrl: './trace-event-dialog.component.html',
  styleUrls: ['./trace-event-dialog.component.css']
})

export class TraceEventDialogComponent implements OnInit {
  targetEvent: TraceEvent;

  constructor(public dialogRef: MatDialogRef<TraceEventDialogData>, @Inject(MAT_DIALOG_DATA) public data: TraceEventDialogData) {
    this.targetEvent = data.event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
