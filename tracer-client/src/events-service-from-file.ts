import {TraceEvent} from "./trace-event";
import {EventsService} from "./events-service";
import {Utils} from "./utils";
import {Page} from "./page";

export class EventsServiceFromFile implements EventsService{
    private sequenceNumber: number = 0;
    private traceEventNodes: HTMLCollectionOf<Element>;
    constructor(){

    }
    clear(){
        this.sequenceNumber = 1;
    }

    connect(): Promise<any>{
        return new Promise<Document>((resolve, fail)=>{
            const request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000");
            request.onload = () => {
                let response = request.responseText;
                let parser = new DOMParser();
                let xmlDoc:Document = parser.parseFromString(response,"text/xml");
                let traceLogNode = xmlDoc.getElementsByTagName("tracelog")[0];
                if(traceLogNode) {
                    this.traceEventNodes = traceLogNode.getElementsByTagName("TraceEvent");
                }
                resolve();
            };
            request.onerror = (e)=>{fail(e);};
            request.send(null);
        });
    }

    requestTraceEvents(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
            setTimeout(() =>{
                let eventList = [];
                for(let i = 0; i<200; i++){

                    if(this.sequenceNumber> this.traceEventNodes.length){
                        break;
                    }

                    let eventNode = this.traceEventNodes[this.sequenceNumber];
                    let event = new TraceEvent();
                    event.sequenceNumber = Utils.getNodeIntValue(eventNode, "Sequence");
                    event.activityName = Utils.getNodeValue(eventNode, "ActivityName");
                    event.stepNumber = Utils.getNodeValue(eventNode, "StepNumber");
                    event.eventType = Utils.getNodeValue(eventNode, "EventType");
                    event.stepMethod = Utils.getNodeValue(eventNode, "StepMethod");
                    event.stepStatus = Utils.getNodeValue(eventNode, "StepStatus");
                    event.interaction = Utils.getNodeValue(eventNode, "Interaction");
                    event.threadname = Utils.getNodeValue(eventNode, "ThreadName");
                    event.sRSName = Utils.getAttributeValue(eventNode,"rsname");
                    event.sRSVersion = Utils.getAttributeValue(eventNode,"rsvers");
                    event.timeStamp = Utils.getNodeValue(eventNode, "Elapsed");
                    event.primaryPageName = Utils.getNodeValue(eventNode, "PrimaryPageName");


                    //if it has primaryPage, set the event primaryPage attribute also
                    let primaryPage = Utils.getNodeValue(eventNode, "PrimaryPage");

                    if(typeof primaryPage !== null)
                        event.primaryPage = primaryPage;


                    eventList.push(event);

                    this.sequenceNumber++;
                }
                resolve(eventList);
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


    getPageContent(eventNumber: number, pageName: string): Promise<Page> {

        return new Promise<Page>((resolve,fail) => {
            resolve();
        })
    }
}
