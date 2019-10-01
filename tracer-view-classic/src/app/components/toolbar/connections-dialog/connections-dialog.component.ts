import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PageDialogData} from "../../event-list/event-list.component";

@Component({
  selector: 'app-connections-dialog',
  templateUrl: './connections-dialog.component.html',
  styleUrls: ['./connections-dialog.component.css']
})
export class ConnectionsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConnectionsDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
