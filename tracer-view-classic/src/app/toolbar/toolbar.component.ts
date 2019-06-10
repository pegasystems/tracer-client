import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pausePlay(){
    this.output("pausePlay");

  }

  clear(){
    this.output("clear");

  }

  play(){
    this.output("play");

  }

  pause(){
    this.output("pause");

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
    this.output("save");

  }

  settings(){
    this.output("settings");
  }

  output(message: String){
    alert(message);
  }
}
