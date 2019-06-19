import {Component, OnInit, EventEmitter} from '@angular/core';
import {TraceEvent} from '../trace-event'
import {TracerEventsService} from "../tracer-events.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: TraceEvent[];
  displayedColumns: string[] = [
    'line',
    'thread',
    'interaction',
    'rulesNumber',
    'stepMethod',
    'stepPage',
    'step',
    'eventType',
    'elapsed',
    'ruleName',
    'ruleset'];

  constructor(eventsService: TracerEventsService) {
    this.events = [];
    eventsService.onTraceEvents().subscribe((result) => {
      result.forEach((traceEvent) => {
        this.events.push(traceEvent);
      });
    });
  }

  ngOnInit() {
  }

  openStepPage() {
    alert("openStepPage")
  }

  openStepDetail() {
    alert("openStepDetail")
  }

  openRule() {
    alert("openRule")
  }
}
