import {TraceEvent} from "./trace-event";
import {EventsService} from "./events-service";
import {Utils} from "./utils";
import {Page} from "./page";
import {TraceEventProperty} from "./trace-event-property";

export class EventsServiceFromFile implements EventsService {
    private sequenceNumber: number = 0;
    private traceEventNodes: HTMLCollectionOf<Element>;

    traceEvent: TraceEvent;

    constructor() {

    }

    clear() {
        this.sequenceNumber = 1;
    }

    connect(): Promise<any> {
        return new Promise<Document>((resolve, fail) => {
            const request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000");
            request.onload = () => {
                let response = request.responseText;
                let parser = new DOMParser();
                let xmlDoc: Document = parser.parseFromString(response, "text/xml");
                let traceLogNode = xmlDoc.getElementsByTagName("tracelog")[0];
                if (traceLogNode) {
                    this.traceEventNodes = traceLogNode.getElementsByTagName("TraceEvent");
                }
                resolve();
            };
            request.onerror = (e) => {
                fail(e);
            };
            request.send(null);
        });
    }

    requestTraceEvents(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
            setTimeout(() => {
                let eventList = [];
                for (let i = 0; i < 200; i++) {

                    if (this.sequenceNumber > this.traceEventNodes.length) {
                        break;
                    }

                    let eventNode = this.traceEventNodes[this.sequenceNumber];
                    let event = new TraceEvent();


                    //line and boolean properties not obtained
                    event.sequenceNumber = Utils.getNodeIntValue(eventNode, "Sequence");
                    event.activityName = Utils.getNodeStringValue(eventNode, "ActivityName");
                    event.stepNumber = Utils.getNodeStringValue(eventNode, "StepNumber");
                    event.eventType = Utils.getNodeStringValue(eventNode, "EventType");
                    event.stepMethod = Utils.getNodeStringValue(eventNode, "StepMethod");
                    event.stepStatus = Utils.getNodeStringValue(eventNode, "mStepStatus");
                    event.interaction = Utils.getNodeStringValue(eventNode, "Interaction");
                    event.threadname = Utils.getNodeStringValue(eventNode, "ThreadName");
                    event.sRSName = Utils.getAttributeValue(eventNode, "rsname");
                    event.sRSVersion = Utils.getAttributeValue(eventNode, "rsvers");
                    event.timeStamp = Utils.getNodeStringValue(eventNode, "Elapsed");
                    event.primaryPageName = Utils.getNodeStringValue(eventNode, "PrimaryPageName");
                    event.activityNumber = Utils.getNodeStringValue(eventNode, "ActivityNumber");
                    event.alertLabel = Utils.getNodeStringValue(eventNode, "AlertLabel");
                    event.DBTData = Utils.getNodeStringValue(eventNode, "DBTData");
                    event.eventKey = Utils.getNodeStringValue(eventNode, "EventKey");
                    event.eventName = Utils.getNodeStringValue(eventNode, "EventName");
                    event.eventNode = Utils.getNodeStringValue(eventNode, "NodeName");
                    event.adpTracerKey = Utils.getNodeStringValue(eventNode, "ADPTracerKey");
                    event.adpTracerRackKey = Utils.getNodeStringValue(eventNode, "ADPTracerRackKey");
                    event.adpLoadPageName = Utils.getNodeStringValue(eventNode, "ADPLoadPageName");
                    event.interactionBytes = Utils.getNodeStringValue(eventNode, "InteractionBytes");
                    event.interactionQueryParam = Utils.getNodeStringValue(eventNode, "InteractionQueryParam");
                    event.methodName = Utils.getNodeStringValue(eventNode, "MethodName");
                    event.sInsKey = Utils.getNodeStringValue(eventNode, "inskey");
                    event.sKeyName = Utils.getNodeStringValue(eventNode, "keyname");
                    event.endSequenceNumber = Utils.getNodeStringValue(eventNode, "EndSequence");
                    event.primaryPage = new Page(event.primaryPageName, Utils.getNodeObjectValue(eventNode, "PrimaryPageContent").innerHTML);

                    eventList.push(event);
                    this.sequenceNumber++;
                }
                resolve(eventList);
            }, 3000);
        });

    }

    getTraceEvent(sequenceNumber: number): Promise<TraceEvent> {
        return new Promise<any>((resolve, fail) => {
            resolve();
        });
    }

    postOptions(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
            resolve();
        });
    };

    disconnect() {
    }


    getPageContent(eventNumber: number, pageName: string): Promise<Page> {

        return new Promise<Page>((resolve, fail) => {
            resolve();
        })
    }
}
