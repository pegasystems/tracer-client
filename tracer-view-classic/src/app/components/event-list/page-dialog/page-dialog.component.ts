import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {PageDialogData} from "../event-list.component";
import {Page} from "../../../../../../tracer-client/src/page";

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.css']
})
export class PageDialogComponent implements OnInit {
  targetPage : Page;

  constructor(public dialogRef: MatDialogRef<PageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PageDialogData) {
    this.targetPage = data.page;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
