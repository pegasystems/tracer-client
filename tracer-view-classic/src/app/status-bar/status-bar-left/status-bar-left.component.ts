import { Component, OnInit } from '@angular/core';
import {TracerLocalStatusService} from "../../tracer-local-status.service";

@Component({
  selector: 'app-status-bar-left',
  templateUrl: './status-bar-left.component.html',
  styleUrls: ['./status-bar-left.component.css']
})
export class StatusBarLeftComponent implements OnInit {

  statusMessage : string;

  constructor(private statusService: TracerLocalStatusService) {
    this.statusMessage = "Default Status Message";
  }

  ngOnInit() {

    this.statusService.onStatusMessageUpdate().subscribe((statusMessage)=>{
      this.update(statusMessage);
    });
  }

  update(value: string){
    this.statusMessage = value;
  }
}
