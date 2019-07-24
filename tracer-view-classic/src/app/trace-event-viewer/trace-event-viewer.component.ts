import {Component, Input, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {TraceEvent} from "../../../../tracer-client/src/trace-event";



export class TraceEventRow{
  name: string;
  value:string;
}

const ELEMENT_DATA: TraceEventRow[] = [
  {name: "stuff", value:"sadsa"},
  {name: "sadsada", value: "234324"}
];


@Component({
  selector: 'app-traceevent-viewer',
  templateUrl: './trace-event-viewer.component.html',
  styleUrls: ['./trace-event-viewer.component.css']
})

export class TraceEventViewerComponent implements OnInit {
  @Input() traceEvent: TraceEvent;

  displayedColumns: string[] = ["name", "value"];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
