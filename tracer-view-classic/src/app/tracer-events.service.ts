import { Injectable } from '@angular/core';
import {TraceEvent} from './trace-event';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TracerEventsService {
  constructor() { }
  eventCount: number = 0;
  getTraceEvents(): Observable<TraceEvent[]>{
    return new Observable((observer)=>{
      setInterval(()=>{
        let events = this.get100Events();
        observer.next(events);
      }, 5000);
    });
  }

  private get100Events(): TraceEvent[]{
    let events = [];
    for(let i = 0; i < 100; i++){
      let event = new TraceEvent();
      event.line = ""+this.eventCount++;
      events.push(event);
    }
    return events;
  }
}
