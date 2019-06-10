import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TracerLocalStatusService {

  status: string;
  statusMessage: string;

  constructor() {
    this.status = "Tracing...";
    this.statusMessage = "(No message)";
  }

  setStatus(status: string){
    this.status = status;
  }

  getStatus(){
    return this.status;
  }

  setStatusMessage(statusMessage: string){
    this.statusMessage = statusMessage;
  }

  getStatusMessage(){
    return this.statusMessage;
  }
}
