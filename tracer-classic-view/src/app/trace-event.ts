// THIS SHOULD BE SHARED WITH TRACER CLIENT!!!
export class TraceEvent {

  line: string;
  thread: string;
  interaction: string;
  rulesNumber: string;
  stepMethod: string;
  stepPage: string;
  step: string;
  eventType: string;
  elapsed: string;
  ruleName: string;
  ruleset: string;

  constructor() {
  }

  getStyle(): number {
    return -1;
  }
}
