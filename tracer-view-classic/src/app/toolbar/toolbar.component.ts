import { Component, OnInit } from '@angular/core';
import {TracerService} from "../tracer.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  tracing: boolean;

  constructor(private tracerService: TracerService) {}

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

  breakpoints(){
    this.output("breakpoints");
  }

  watchVariables(){
    this.output("watchVariables");
  }

  remoteTrace(){
    this.output("remoteTrace");
  }

  save(){
    this.tracerService.save();
  }

  settings(){
    this.output("settings");
  }

  output(message: String){
    alert(message);
  }
}
