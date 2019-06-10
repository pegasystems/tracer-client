"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trace_event_1 = require("./trace-event");
const utils_1 = require("./utils");
class EventsServiceFromFile {
    constructor() {
        this.sequenceNumber = 1;
    }
    clear() {
        this.sequenceNumber = 1;
    }
    connect() {
        return new Promise((resolve, fail) => {
            const request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000");
            request.onload = () => {
                var response = request.responseText;
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(response, "text/xml");
                let traceLogNode = xmlDoc.getElementsByTagName("tracelog")[0];
                if (traceLogNode) {
                    this.traceEventNodes = traceLogNode.getElementsByTagName("TraceEvent");
                }
                resolve();
            };
            request.onerror = (e) => { fail(e); };
            request.send(null);
        });
    }
    requestTraceEvents() {
        return new Promise((resolve, fail) => {
            setTimeout(() => {
                let eventList = [];
                for (let i = 0; i < 200; i++) {
                    let eventNode = this.traceEventNodes[this.sequenceNumber];
                    let event = new trace_event_1.TraceEvent();
                    event.sequenceNumber = utils_1.Utils.getNodeIntValue(eventNode, "Sequence");
                    event.activityName = utils_1.Utils.getNodeValue(eventNode, "ActivityName");
                    event.stepNumber = utils_1.Utils.getNodeValue(eventNode, "StepNumber");
                    event.eventType = utils_1.Utils.getNodeValue(eventNode, "EventType");
                    event.stepMethod = utils_1.Utils.getNodeValue(eventNode, "StepMethod");
                    event.stepStatus = utils_1.Utils.getNodeValue(eventNode, "StepStatus");
                    event.interaction = utils_1.Utils.getNodeValue(eventNode, "Interaction");
                    event.threadname = utils_1.Utils.getNodeValue(eventNode, "ThreadName");
                    event.sRSName = utils_1.Utils.getAttributeValue(eventNode, "rsname");
                    event.sRSVersion = utils_1.Utils.getAttributeValue(eventNode, "rsvers");
                    event.timeStamp = utils_1.Utils.getNodeValue(eventNode, "Elapsed");
                    event.primaryPageName = utils_1.Utils.getNodeValue(eventNode, "PrimaryPageName");
                    eventList.push(event);
                    this.sequenceNumber++;
                }
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
exports.EventsServiceFromFile = EventsServiceFromFile;
//# sourceMappingURL=events-service-from-file.js.map