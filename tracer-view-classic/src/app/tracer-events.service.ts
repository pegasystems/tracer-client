import {Injectable} from '@angular/core';
import {TraceEvent} from './trace-event';
import {Observable,Observer} from "rxjs";
import {TracerLocalStatusService} from "./tracer-local-status.service";
import {Client} from "../../../tracer-client/src/client";

//import * as Tracer from "tracer-client";


@Injectable({
  providedIn: 'root'
})



export class TracerEventsService {
  client: Client;


  //One TraceEvent, A TraceEvent Observable and array of TraceEvent observers
  event$: Observable<TraceEvent[]>;
  eventObservers: Array<Observer<TraceEvent[]>>;

  constructor(private statusService: TracerLocalStatusService) {
    this.client = new Client("FILE", "", "");


    this.eventObservers = new Array<Observer<TraceEvent[]>>();

    this.event$ = new Observable((eventObserver)=>{
      this.eventObservers.push(eventObserver);
    });


    this.client.registerEventCallback((event) => {

      let traceEvent = new TraceEvent();
      let eventArray: TraceEvent [] = [];

      traceEvent.aaQueueEvent = event.aaQueueEvent;
      traceEvent.activityName = event.activityName;
      traceEvent.activityNumber = event.activityNumber;
      traceEvent.adpLoadPageName = event.adpLoadPageName;
      traceEvent.adpQueueEvent = event.adpQueueEvent;
      traceEvent.adpTracerKey = event.adpTracerKey;
      traceEvent.adpTracerRackKey = event.adpTracerRackKey;
      traceEvent.alertLabel = event.alertLabel;
      traceEvent.DBTData = event.DBTData;
      traceEvent.endSequenceNumber = event.endSequenceNumber;
      traceEvent.eventKey = event.eventKey;
      traceEvent.eventName = event.eventName;
      traceEvent.eventNode = event.eventNode;
      traceEvent.eventType = event.eventType;
      traceEvent.hasMessages = event.hasMessages;
      traceEvent.interaction = event.interaction;
      traceEvent.interactionBytes = event.interactionBytes;
      traceEvent.interactionQueryParam = event.interactionQueryParam;
      traceEvent.methodName = event.methodName;
      traceEvent.primaryPageName = event.primaryPageName;
      traceEvent.primaryPage = event.primaryPage;
      traceEvent.sequenceNumber = event.sequenceNumber;
      traceEvent.sInsKey = event.sInsKey;
      traceEvent.sKeyName = event.sKeyName;
      traceEvent.sRSName = event.sRSName;
      traceEvent.sRSVersion = event.sRSVersion;
      traceEvent.stepMethod = event.stepMethod;
      traceEvent.stepNumber = event.stepNumber;
      traceEvent.stepStatus = event.stepStatus;
      traceEvent.threadname = event.threadname;
      traceEvent.timeStamp = event.timeStamp;

      traceEvent.childEvents = event.childEvents;
      traceEvent.parentEvent = event.parentEvent;


      eventArray.push(traceEvent);

      for(let eventObserver of this.eventObservers){
        eventObserver.next(eventArray);
      }

      this.statusService.setStatusMessage("The Status Message: " + this.statusCount);
      this.statusService.setStatus("The Status: " + this.eventCount);

      this.eventCount++;
      this.statusCount++;
    });


    this.client.start();
  }

  eventCount: number = -1;
  statusCount: number = -1;


  onTraceEvents(): Observable<TraceEvent[]> {
    return this.event$;
  }

}



