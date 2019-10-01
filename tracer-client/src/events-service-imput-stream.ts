import {EventsService} from "./events-service";
import {ToolbarState} from "./toolbar-state";
import {Page} from "./page";
import {TraceEvent} from "./trace-event";
import {Utils} from "./utils";

export class EventsServiceImputStream implements EventsService {
    private sequenceNumber: number = 0;
    private traceEventNodes: HTMLCollectionOf<Element>;
    traceEvent: TraceEvent;
    private stream: ReadableStream;
    constructor(stream: ReadableStream){
        this.stream = stream;
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }

    connect(): Promise<any> {
        return new Promise<Document>((resolve, fail) => {
            this.fetchFromStream(this.stream).then((result)=>{
                let parser = new DOMParser();
                let xmlDoc: Document = parser.parseFromString(result, "text/xml");
                let traceLogNode = xmlDoc.getElementsByTagName("tracelog")[0];
                if (traceLogNode) {
                    this.traceEventNodes = traceLogNode.getElementsByTagName("TraceEvent");
                }
                resolve();
            });
        });
    }

    disconnect(force: boolean): void {
        throw new Error("Method not implemented.");
    }

    getPageContent(eventNumber: number, pageName: string): Promise<Page> {
        throw new Error("Method not implemented.");
    }

    getToolbarState(): Promise<ToolbarState> {
        throw new Error("Method not implemented.");
    }

    getTraceEvent(sequenceNumber: number): Promise<TraceEvent> {
        throw new Error("Method not implemented.");
    }

    postOptions(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    requestTraceEvents(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
            // There is no need for this set timeout. It was added to simulate the real tracer while demoing
            setTimeout(() => {
                let eventList = [];
                for (let i = 0; i < 200; i++) {

                    if (this.sequenceNumber > this.traceEventNodes.length) {
                        break;
                    }

                    let eventNode = this.traceEventNodes[this.sequenceNumber];
                    let event = new TraceEvent();



                    //Right now, event.alertLabel -> is elapsed time
                    event.sequenceNumber = Utils.getNodeIntValue(eventNode, "Sequence");
                    event.activityName = Utils.getNodeStringValue(eventNode, "ActivityName");
                    event.stepNumber = Utils.getAttributeValue(eventNode, "step")
                    event.eventType = Utils.getNodeStringValue(eventNode, "EventType");
                    event.stepMethod = Utils.getNodeStringValue(eventNode, "StepMethod");
                    event.stepStatus = Utils.getNodeStringValue(eventNode, "mStepStatus");
                    event.interaction = Utils.getNodeStringValue(eventNode, "Interaction");
                    event.threadName = Utils.getNodeStringValue(eventNode, "ThreadName");
                    event.sRSName = Utils.getAttributeValue(eventNode, "rsname");
                    event.sRSVersion = Utils.getAttributeValue(eventNode, "rsvers");
                    event.primaryPageName = Utils.getNodeStringValue(eventNode, "PrimaryPageName");
                    event.activityNumber = Utils.getNodeStringValue(eventNode, "ActivityNumber");
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
                    event.sInsKey = Utils.getAttributeValue(eventNode, "inskey");
                    event.sKeyName = Utils.getAttributeValue(eventNode, "keyname");
                    event.endSequenceNumber = Utils.getNodeStringValue(eventNode, "EndSequence");
                    event.timeStamp = Utils.getNodeStringValue(eventNode, "DateTime");

                    event.primaryPage = new Page(event.primaryPageName, Utils.getNodeObjectValue(eventNode, "PrimaryPageContent").innerHTML);

                    let elapsedTime = parseFloat(Utils.getNodeStringValue(eventNode, "Elapsed"))/1000;

                    if(elapsedTime) {
                        event.alertLabel = elapsedTime.toString();
                    }


                    debugger;
                    eventList.push(event);

                    this.sequenceNumber++;
                }
                resolve(eventList);
            }, 10);
        });
    }

     fetchFromStream(stream: ReadableStream) {
        return new Promise<string>((resolve, fail) => {
            const reader = stream.getReader();
            let charsReceived = 0;
            let result = "";
            reader.read().then(function processText({done, value}): any {
                if (done) {
                    console.log("Stream complete");
                    resolve(result);
                } else {
                    // value for fetch streams is a Uint8Array
                    charsReceived += value.length;
                    result += value;
                    return reader.read().then(processText);
                }

            });
        });
    }
}