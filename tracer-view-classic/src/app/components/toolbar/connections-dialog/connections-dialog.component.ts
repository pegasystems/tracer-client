import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TracerEventsService} from "../../../services/tracer-events/tracer-events.service";

@Component({
  selector: 'app-connections-dialog',
  templateUrl: './connections-dialog.component.html',
  styleUrls: ['./connections-dialog.component.css']
})
export class ConnectionsDialogComponent implements OnInit {
  serviceImplementation: string = 'INPUT_STREAM';
  serviceImplementations: string[] = ['PEGA', 'INPUT_STREAM'];
  fileName: string = "";
  fileInput: HTMLInputElement;

  constructor(public dialogRef: MatDialogRef<ConnectionsDialogComponent>, private eventsService: TracerEventsService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.fileInput = <HTMLInputElement>document.getElementById("sourceFile");
  }

  parseFile(){
    this.fileInput = <HTMLInputElement>document.getElementById("sourceFile");
    // @ts-ignore
    let stream: ReadableStream = this.fileInput.files[0].stream();
    this.eventsService.changeImplementation(this.serviceImplementation,"","", stream);
    this.dialogRef.close();
  }

  setFileName(){
    debugger;
    this.fileInput = <HTMLInputElement>document.getElementById("sourceFile");
    this.fileName = this.fileInput.files[0].name;
  }
}
