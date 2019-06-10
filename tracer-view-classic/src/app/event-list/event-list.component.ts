import { Component, OnInit } from '@angular/core';
import { TraceEvent } from '../trace-event'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events : TraceEvent[];
  displayedColumns: string[] = ['line',
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
  constructor() {
    this.events = [];
    for(let i = 0; i < 100; i++){
      let event = new TraceEvent();
      event.line = ""+i;
      this.events.push(event);
    }
  }

  ngOnInit() {
  }

}
