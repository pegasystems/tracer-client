import { Component, OnInit } from '@angular/core';
import {TracerLocalStatusService} from "../../tracer-local-status.service";

@Component({
  selector: 'app-status-bar-left',
  templateUrl: './status-bar-left.component.html',
  styleUrls: ['./status-bar-left.component.css']
})
export class StatusBarLeftComponent implements OnInit {

  statusMessage : string;

  constructor(private statusService: TracerLocalStatusService) { }

  ngOnInit() {
    this.update();
  }

  update(){
    this.statusMessage = this.statusService.getStatusMessage();
  }
}
