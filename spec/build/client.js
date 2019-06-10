"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_service_pega8_1 = require("./events-service-pega8");
const options_1 = require("./options");
class Client {
    constructor(connectionId, nodeId) {
        /**
         * This module provides an interface for interacting with an events-service. It's primary function is to initialize a
         * tracer session, poll for new events, and store those events in memory for client side retrieval.
         */
        // Instance variables
        this.connectionID = "";
        this.nodeId = "";
        this.tracerInitialized = false;
        this.tracerEnabled = false;
        this.eventsList = [];
        this.traceEventArray = [];
        this.eventCallbacks = this.getDefaultCallback();
        // Dependencies
        this.options = options_1.Options;
        this.connectionID = connectionId;
        this.nodeId = nodeId;
        this.eventsService = new events_service_pega8_1.EventsServicePega8(this.connectionID, this.nodeId);
        //this.eventsService = new EventsServiceFromFile();
    }
    /**
     * Start a event service session and begin polling for new trace events
     */
    initializeTracer() {
        if (this.connectionID == "") {
            throw "EmptyConnectionID";
        }
        this.eventsService.connect()
            .then(() => {
            console.log("Connected!");
            this.mainTracerLoop();
        }).catch(() => { });
    }
    /**
     * poll events service for trace events
     */
    mainTracerLoop() {
        if (this.tracerEnabled) {
            this.eventsService.requestTraceEvents()
                .then((res) => {
                this.parseTraceResponse(res);
            })
                .catch((e) => {
                throw {
                    name: "EventsServiceException",
                    message: e
                };
            });
        }
    }
    parseTraceResponse(eventsToAppend) {
        if (eventsToAppend.length > 0) {
            this.appendEvents(eventsToAppend);
            setTimeout(() => { this.mainTracerLoop(); }, 10);
        }
        else {
            console.log("No events");
            setTimeout(() => { this.mainTracerLoop(); }, 4000);
        }
    }
    /**
     * Invoke any registered events callbacks for each event in an array.
     * @param eventArray
     */
    appendEvents(eventArray) {
        for (let i = 0; i < eventArray.length; i++) {
            let currentEvent = eventArray[i];
            if (currentEvent) {
                this.eventsList.push(currentEvent);
                this.eventCallbacks.forEach((eventCallback) => { eventCallback(currentEvent); });
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
    stop() {
        if (this.tracerEnabled) {
            this.tracerEnabled = false;
            this.disconnect();
        }
        else {
            // Do nothing
        }
    }
    /**
     * Start requesting trace events from the events service. Any regisitered callbacks will be invoked with the
     * results.
     */
    start() {
        if (this.tracerEnabled) {
            // Do nothing
        }
        else {
            this.tracerEnabled = true;
            this.initializeTracer();
        }
    }
    /**
     * Register a callback function which is invoked whenever the events service returns a list of events.
     * @param callback
     */
    registerEventCallback(callback) {
        this.eventCallbacks.push(callback);
    }
    /**
     * All class dependencies can be swapped out with another object that fulfills the same role. This is useful for
     * jasmine tests, or providing alternate implementations.
     * @param args
     */
    _injectDependencies(args) {
        for (let key in args) {
            let value = args[key];
            switch (key) {
                case "EventsService":
                    this.eventsService = value;
                    break;
            }
        }
    }
    /**
     * Gets an array with a default callback function
     */
    getDefaultCallback() {
        return [
            function (currentEvent) {
                // This is the default event callback which writes event details to the log.
                console.log(currentEvent.sequenceNumber + " " +
                    currentEvent.activityName + " " +
                    currentEvent.stepNumber + " " +
                    currentEvent.eventType + " " +
                    currentEvent.stepMethod + " " +
                    currentEvent.stepStatus);
            }
        ];
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map