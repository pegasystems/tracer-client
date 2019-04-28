import * as TraceEvent from '../trace-event';
import * as Filter from '../filter';
import * as EventsService from '../events-service';
import * as Options from '../options';
import * as Utils from '../utils';

class Client {
    /**
     * This module provides an interface for interacting with an events-service. It's primary function is to initialize a
     * tracer session, poll for new events, and store those events in memory for client side retrieval.
     */

        // Dependencies
    traceEvent = TraceEvent;
    filter = Filter;
    eventsService = EventsService;
    options = Options;
    utils = Utils;

    // Instance variables
    connectionID: string = "";
    tracerInitialized: boolean = false;
    tracerEnabled: boolean = false;
    filters: Array<Filter> = [];
    eventsList: Array<TraceEvent> = [];
    traceEventArray : Array<TraceEvent> = [];
    eventCallbacks = [
        function(currentEvent: TraceEvent){
            // This is the default event callback which writes event details to the log.
            console.log(currentEvent.sequenceNumber + " " +
                currentEvent.activityName + " " +
                currentEvent.stepNumber + " " +
                currentEvent.eventType + " " +
                currentEvent.stepMethod + " " +
                currentEvent.stepStatus);
        }
    ];

    constructor(connectionId: string) {
        this.connectionID = connectionId;
    }

    /**
     * Start a event service session and begin polling for new trace events
     */
    initializeTracer(){
        if (this.connectionID == "") {
            throw "EmptyConnectionID";
        }

        if(!this.tracerInitialized){
            this.eventsService = new EventsService(this.connectionID);
            this.tracerInitialized = true;
        }

        this.eventsService.connect({
            success : this.mainTracerLoop,
            fail : function(){}
        });
    }

    /**
     * poll events service for trace events
     */
    mainTracerLoop(){
        if(this.tracerEnabled) {
            this.eventsService.getTraceEvents({
                success : this.parseTraceResponse,
                error : function(aMessage: string){
                    throw {
                        name : "EventsServiceException",
                        message : aMessage
                    }
                }
            });
        }
    }

    parseTraceResponse(eventsToAppend: Array<TraceEvent>){
        if(eventsToAppend.length > 0) {
            this.appendEvents(eventsToAppend);
            setTimeout(this.mainTracerLoop, 10);
        } else {
            setTimeout(this.mainTracerLoop, 1000);
        }
    }

    /**
     * Invoke any registered events callbacks for each event in an array.
     * @param eventArray
     */
    appendEvents(eventArray: Array<TraceEvent>){
        for(var i =0; i< eventArray.length; i++){
            var currentEvent = eventArray[i];
            if(currentEvent) {
                this.eventsList.push(currentEvent);
                for (var k = 0; k < this.filters.length; k++) {
                    if (!currentEvent.applyFilter(this.filters[k])) {
                        return;
                    }
                }
                if (currentEvent) {
                    this.eventCallbacks.forEach(eventCallback => {eventCallback(currentEvent)});
                }
            }
        }
    }

    /**
     * End the session with the events service
     * @param bForceDisconnect
     */
    disconnect(bForceDisconnect) {
        this.eventsService.disconnect(bForceDisconnect);
    }

    /**
     * Test the events service that it can delete all of it's stored events
     */
    deleteTraceEvents() {
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
    getEventHeader(eventNumber: number){
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
        this.eventsService.getTraceEvent(eventNumber, callbacks);
    }

    /**
     * All class dependencies can be swapped out with another object that fulfills the same role. This is useful for
     * jasmine tests, or providing alternate implementations.
     * @param args
     */
    injectDependencies(args){
        for(var key in args){
            var value = args[key];
            switch(key) {
                case "EventsService":
                    EventsService = value;
                    break;
                case "TraceEvent":
                    TraceEvent = value;
                    break;
                case "Filter":
                    Filter = value;
                    break;
                case "Options":
                    Options = value;
                    break;
                case "Utils":
                    Utils = value;
                    break;
            }
        }
    }

    //public functions
    // var publicAPI = {};
    // publicAPI._injectDependencies = injectDependencies;
    // publicAPI.start = start;
    // publicAPI.stop = stop;
    // publicAPI.registerEventCallback = registerEventCallback;
    // publicAPI.clear = deleteTraceEvents;
    // publicAPI.displayTraceEvent = displayTraceEvent;
    // publicAPI.getEventHeader = getEventHeader;
    // return publicAPI;
}