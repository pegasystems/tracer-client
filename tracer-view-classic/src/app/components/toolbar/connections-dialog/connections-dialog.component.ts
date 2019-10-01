import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PageDialogData} from "../../event-list/event-list.component";
import {EventsService} from "../../../../../../tracer-client/src/events-service";
import {TracerEventsService} from "../../../services/tracer-events/tracer-events.service";

@Component({
  selector: 'app-connections-dialog',
  templateUrl: './connections-dialog.component.html',
  styleUrls: ['./connections-dialog.component.css']
})
export class ConnectionsDialogComponent implements OnInit {
  serviceImplementation: string = 'PEGA';
  serviceImplementations: string[] = ['PEGA', 'FILE', 'INPUT_STREAM'];
  constructor(public dialogRef: MatDialogRef<ConnectionsDialogComponent>, private eventsService: TracerEventsService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  parseFile(){
    debugger;
    let fileInput = <HTMLInputElement>document.getElementById("sourceFile");
    // @ts-ignore
    let stream: ReadableStream = fileInput.files[0].stream();
    this.eventsService.changeImplementation(this.serviceImplementation,"","", stream);
  }
}
