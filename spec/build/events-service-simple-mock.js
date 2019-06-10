"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trace_event_1 = require("./trace-event");
class EventsServiceSimpleMock {
    constructor() {
        this.sequenceNumber = 1;
    }
    clear() {
        this.sequenceNumber = 1;
    }
    connect() {
        return new Promise((resolve, fail) => {
            resolve();
        });
    }
    requestTraceEvents() {
        return new Promise((resolve, fail) => {
            setTimeout(() => {
                let eventList = [];
                let event = new trace_event_1.TraceEvent();
                event.activityName = "activityName" + this.sequenceNumber;
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
    getTraceEvent(sequenceNumber) {
        return new Promise((resolve, fail) => {
            resolve();
        });
    }
    postOptions() {
        return new Promise((resolve, fail) => {
            resolve();
        });
    }
    ;
    disconnect() { }
}
exports.EventsServiceSimpleMock = EventsServiceSimpleMock;
//# sourceMappingURL=events-service-simple-mock.js.map