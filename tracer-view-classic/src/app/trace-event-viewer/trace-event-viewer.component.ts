import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule, MatTable} from '@angular/material/table';

import {TraceEvent} from "../../../../tracer-client/src/trace-event";
import {TraceEventProperty} from "../../../../tracer-client/src/trace-event-property";

@Component({
  selector: 'app-trace-event-viewer',
  templateUrl: './trace-event-viewer.component.html',
  styleUrls: ['./trace-event-viewer.component.css']
})

export class TraceEventViewerComponent implements OnInit {

  @Input() traceEvent: TraceEvent;

  displayedColumns: string[] = ["Property Name", "Property Value"];
  propertyList: TraceEventProperty[];


  dataSource = new MatTableDataSource<TraceEventProperty>(this.propertyList);


  constructor() {
  }

  //no drop shadow, and full modal width

  ngOnInit() {
    this.propertyList = [];
    for (let prop in this.traceEvent) {
      if (this.traceEvent[prop] && typeof this.traceEvent[prop] !== "object") {
        this.propertyList.push(new TraceEventProperty(prop, this.traceEvent[prop]));
      }
    }

    this.dataSource.data = this.propertyList;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
