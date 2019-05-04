import {TraceEvent} from "../src/trace-event";

export class MockTracerServlet {
    private sequenceNumber: number = 1;
    connect(callbacks: any){
        callbacks.success();
    }
    constructor(){

    }
    clear(){
        this.sequenceNumber = 1;
    }
    requestTraceEvents(callbacks: any){
        setTimeout(() =>{
            let eventList = [];
            let event = new TraceEvent();
            event.activityName = "activityName"+this.sequenceNumber;
            event.interaction = "1";
            event.sequenceNumber = this.sequenceNumber;
            event.threadname = "STANDARD2";
            event.eventType = "Activity 2Begin";
            event.methodName = "Property-Set";
            event.stepStatus = "Good";
            event.sRSName = "Pega-Desktop";
            event.sRSVersion = "07-10-35";
            event.timeStamp = "0.000";
            event.primaryPageName = "pyWorkPage";
            eventList.push(event);
            callbacks.success(eventList);
            this.sequenceNumber++;
        }, 1000);

    }
    getTraceEvent(){}
    setOptions(){}
    disconnect(){}
}
