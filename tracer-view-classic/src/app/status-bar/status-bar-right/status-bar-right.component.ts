import { Component, OnInit } from '@angular/core';
import {TracerLocalStatusService} from "../../tracer-local-status.service";

@Component({
  selector: 'app-status-bar-right',
  templateUrl: './status-bar-right.component.html',
  styleUrls: ['./status-bar-right.component.css']
})
export class StatusBarRightComponent implements OnInit {

  status: string;

  constructor(private statusService: TracerLocalStatusService) { }

  ngOnInit() {
    this.update();
  }

  update(){
    this.status = this.statusService.getStatus();

  }
}
