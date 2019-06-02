import {TraceEvent} from './trace-event';
import {EventsServicePega8} from './events-service-pega8';
import {EventsServiceFromFile} from "./events-service-from-file";
import {Options} from './options';
import {EventsService} from "./events-service";

export class Client {
    /**
     * This module provides an interface for interacting with an events-service. It's primary function is to initialize a
     * tracer session, poll for new events, and store those events in memory for client side retrieval.
     */

    // Instance variables
    connectionID: string = "";
    nodeId: string = "";
    tracerInitialized: boolean = false;
    tracerEnabled: boolean = false;
    eventsList: Array<TraceEvent> = [];
    traceEventArray : Array<TraceEvent> = [];
    eventCallbacks: any = this.getDefaultCallback();

    // Dependencies
    options = Options;
    eventsService: EventsService;

    constructor(connectionId: string, nodeId: string) {
        this.connectionID = connectionId;
        this.nodeId = nodeId;
        this.eventsService = new EventsServicePega8(this.connectionID, this.nodeId);
        //this.eventsService = new EventsServiceFromFile();
    }

    /**
     * Start a event service session and begin polling for new trace events
     */
    private initializeTracer(){
        if (this.connectionID == "") {
            throw "EmptyConnectionID";
        }

        if(!this.tracerInitialized){
            //this.eventsService = new EventsServicePega8(this.connectionID);
            this.tracerInitialized = true;
        }

        this.eventsService.connect()
            .then(()=>{
                console.log("Connected!");
                this.mainTracerLoop()
            }).catch(()=>{});
    }

    /**
     * poll events service for trace events
     */
    private mainTracerLoop(){
        if(this.tracerEnabled) {
            this.eventsService.requestTraceEvents()
                .then((res)=>{
                    this.parseTraceResponse(res)
                })
                .catch((e)=>{
                    throw {
                        name : "EventsServiceException",
                        message : e
                    }
                });
        }

    }

    private parseTraceResponse(eventsToAppend: Array<TraceEvent>){
        if(eventsToAppend.length > 0) {
            this.appendEvents(eventsToAppend);
            setTimeout(()=>{this.mainTracerLoop()}, 10);
        } else {
            console.log("No events");
            setTimeout(()=>{this.mainTracerLoop()}, 4000);
        }
    }

    /**
     * Invoke any registered events callbacks for each event in an array.
     * @param eventArray
     */
    private appendEvents(eventArray: Array<TraceEvent>){
        for(let i =0; i< eventArray.length; i++){
            let currentEvent = eventArray[i];
            if(currentEvent) {
                this.eventsList.push(currentEvent);
                this.eventCallbacks.forEach((eventCallback: (arg0: TraceEvent) => void) => {eventCallback(currentEvent)});
            }
        }
    }

    /**
     * End the session with the events service
     * @param bForceDisconnect
     */
    disconnect(bForceDisconnect?: boolean) {
        this.eventsService.disconnect(bForceDisconnect);
    }

    /**
     * Test the events service that it can delete all of it's stored events
     */
    private deleteTraceEvents() {
        this.eventsService.clear();
    }

    /**
     * Stop requesting trace events from the events service.
     */
    stop(){
        if(this.tracerEnabled){
            this.tracerEnabled = false;
            this.disconnect();
        } else {
            // Do nothing
        }
    }

    /**
     * Start requesting trace events from the events service. Any regisitered callbacks will be invoked with the
     * results.
     */
    start(){
        if(this.tracerEnabled){
            // Do nothing
        } else {
            this.tracerEnabled = true;
            this.initializeTracer();
        }
    }

    /**
     * Register a callback function which is invoked whenever the events service returns a list of events.
     * @param callback
     */
    registerEventCallback(callback: object){
        this.eventCallbacks.push(callback)
    }

    /**
     * TODO Untested, likely works.
     * Request a single trace event.
     * @param eventNumber
     * @returns {*}
     */
    private getEventHeader(eventNumber: number){
        if(this.traceEventArray[eventNumber]) {
            return this.traceEventArray[eventNumber];
        } else {
            return -1;
        }
    }

    /**
     * TODO Untested, likely doesn't work.
     * Request the full content of a trace event from the events service, including primary page, parameter page, and
     * local variables.
     * @param callbacks
     */
    displayTraceEvent(eventNumber: number, callbacks: object){
        this.eventsService.getTraceEvent(eventNumber);
    }

    /**
     * All class dependencies can be swapped out with another object that fulfills the same role. This is useful for
     * jasmine tests, or providing alternate implementations.
     * @param args
     */
    _injectDependencies(args: any){
        for(let key in args){
            let value = args[key];
            switch(key) {
                case "EventsService":
                    this.eventsService = value;
                    break;
            }
        }
    }

    /**
     * Gets an array with a default callback function
     */
    private getDefaultCallback(): any{
        return [
            function(currentEvent: TraceEvent){
                // This is the default event callback which writes event details to the log.
                console.log(currentEvent.sequenceNumber + " " +
                    currentEvent.activityName + " " +
                    currentEvent.stepNumber + " " +
                    currentEvent.eventType + " " +
                    currentEvent.stepMethod + " " +
                    currentEvent.stepStatus);
            }
        ]
    }
}