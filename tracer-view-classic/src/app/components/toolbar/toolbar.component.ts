import { Component, OnInit } from '@angular/core';
import {TracerService} from "../../services/tracer/tracer.service";
import {PageDialogComponent} from "../event-list/page-dialog/page-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConnectionsDialogComponent} from "./connections-dialog/connections-dialog.component";
import {SettingsDialogComponent} from "./settings-dialog/settings-dialog.component";
import {SaveDialogComponent} from "./save-dialog/save-dialog.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  tracing: boolean;

  constructor(private tracerService: TracerService, public dialog: MatDialog) {}

  ngOnInit() {
  }

  pausePlay(){
    if(this.tracing){
      this.pause();
    } else {
      this.play();
    }
    this.tracing= !this.tracing;
  }

  clear(){
    this.tracerService.clear();
  }

  play(){
    this.tracerService.play();
  }

  pause(){
    this.tracerService.pause();
  }

  remoteTrace(){
    this.dialog.open(ConnectionsDialogComponent, {
      width: "1000px",
      height: "600px",
      data: {}
    });
  }

  save(){
    this.dialog.open(SaveDialogComponent, {
      width: "1000px",
      height: "600px",
      data: {}
    });
  }

  settings(){
    this.dialog.open(SettingsDialogComponent, {
      width: "1000px",
      height: "600px",
      data: {}
    });
  }

  output(message: String){
    alert(message);
  }


}
