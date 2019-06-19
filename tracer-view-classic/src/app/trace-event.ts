// THIS SHOULD BE SHARED WITH TRACER CLIENT!!!
export class TraceEvent {

  /*line: string;
  thread: string;
  interaction: string;
  rulesNumber: string;
  stepMethod: string;
  stepPage: string;
  step: string;
  eventType: string;
  elapsed: string;
  ruleName: string;
  ruleset: string;*/
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
  threadName: string;
  interactionBytes: string;
  interactionQueryParam: string;
  methodName: string;
  stepStatus: string;
  stepMethod: string;
  stepNumber: string;
  primaryPageName: string;
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
