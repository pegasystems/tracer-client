import {Injectable} from '@angular/core';
import {TraceEvent} from './trace-event';
import {Observable} from "rxjs";
import {TracerLocalStatusService} from "./tracer-local-status.service";

@Injectable({
  providedIn: 'root'
})
export class TracerEventsService {
  constructor(private statusService: TracerLocalStatusService) {
  }

  eventCount: number = 0;
  numbers: number = 0;

  getTraceEvents(): Observable<TraceEvent[]> {
    return new Observable((observer) => {
      setInterval(() => {
        let events = this.get100Events();
        this.statusService.setStatusMessage("event counter: " + this.eventCount);

        this.statusService.setStatus("this is status" + this.numbers);

        observer.next(events);
      }, 3000);
    });
  }

  private get100Events(): TraceEvent[] {
    let events = [];
    for (let i = 0; i < 100; i++) {
      let event = new TraceEvent();
      event.line = "" + this.eventCount++;
      events.push(event);

    }
    this.numbers += 10230;

    return events;
  }
}
