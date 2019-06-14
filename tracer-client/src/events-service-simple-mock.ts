import {TraceEvent} from "./trace-event";
import {EventsService} from "./events-service";

export class EventsServiceSimpleMock implements EventsService{
    private sequenceNumber: number = 1;

    constructor(){

    }
    clear(){
        this.sequenceNumber = 1;
    }

    connect(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
            resolve();
        });
    }

    requestTraceEvents(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
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
                resolve(eventList);
                this.sequenceNumber++;
            }, 1000);
        });

    }
    getTraceEvent(sequenceNumber: number): Promise<TraceEvent>{
        return new Promise<any>((resolve, fail)=>{
            resolve();
        });
    }

    postOptions(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
            resolve();
        });
    };
    disconnect(){}
}
