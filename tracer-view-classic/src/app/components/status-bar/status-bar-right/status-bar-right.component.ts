import { Component, OnInit } from '@angular/core';
import {TracerLocalStatusService} from "../../../services/tracer-local-status/tracer-local-status.service";

@Component({
  selector: 'app-status-bar-right',
  templateUrl: './status-bar-right.component.html',
  styleUrls: ['./status-bar-right.component.css']
})
export class StatusBarRightComponent implements OnInit {

  status: string;

  constructor(private statusService: TracerLocalStatusService) {
    this.status = "Default Status";
  }

  ngOnInit() {

    this.statusService.onStatusUpdate().subscribe((status)=>{
      this.update(status);
    });
  }

  update(value: string){
    this.status = value;
  }
}
