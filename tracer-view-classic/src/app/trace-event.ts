// THIS SHOULD BE SHARED WITH TRACER CLIENT!!!
import {Page} from "../../../tracer-client/src/page";

export class TraceEvent {
  line:string;
  activityNumber : string;
  activityName : string;
  alertLabel : string;
  DBTData: string;
  eventKey: string;
  eventName: string;
  eventNode: string;
  eventType: string;
  adpTracerKey: string;
  adpTracerRackKey: string;
  adpLoadPageName: string;
  adpQueueEvent: boolean;
  aaQueueEvent: boolean;
  hasMessages: boolean;
  interaction: string;
  threadname: string;
  interactionBytes: string;
  interactionQueryParam: string;
  methodName: string;
  stepStatus: string;
  stepMethod: string;
  stepNumber: string;
  primaryPageName: string;
  primaryPage: Page;
  sInsKey: string;
  sKeyName: string;
  sRSName: string;
  sRSVersion: string;
  timeStamp: string;
  sequenceNumber: number;
  endSequenceNumber: string;
  childEvents: Array<TraceEvent>;
  parentEvent: TraceEvent;



  constructor() {
  }

  getStyle(): number {
    return -1;
  }

}
