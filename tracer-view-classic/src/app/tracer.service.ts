import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TracerService {

  constructor() { }

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
