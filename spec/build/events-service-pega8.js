"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
const utils_1 = require("./utils");
const trace_event_1 = require("./trace-event");
class EventsServicePega8 {
    constructor(aConnectionID, aNodeId) {
        this.connectionID = aConnectionID;
        this.debugConnectionID = aConnectionID;
        this.nodeId = aNodeId || "";
        this.hostName = "";
        this.options = null;
        this.gTracerInitialized = false;
        this.maxEventsPerRequest = 200;
        this.pyWatchInsKey = "";
        this.pyWatchClassName = "";
        this.serverUrl = "/prweb";
        this.serverUrl = "/prweb";
        this.servletUrl = "/PRTraceServlet";
        this.SESSION_TYPE = "STANDARD";
    }
    connect() {
        return new Promise((resolve, fail) => {
            if (!this.gTracerInitialized) {
                this.getSettings()
                    // .then(()=>{
                    //     return this.initializeWebTierRequestor();
                    // })
                    .then((res) => {
                    return this.initializeTracerRequestor();
                })
                    .then(() => {
                    return this.startConnection();
                })
                    .then(() => {
                    return this.startTrace();
                })
                    .then(() => {
                    return this.postOptions();
                })
                    .then(() => {
                    resolve();
                })
                    .catch((e) => {
                    console.log("Something went wrong: " + e);
                });
            }
            else {
                resolve();
            }
        });
    }
    getSettings() {
        this.options = new options_1.Options(this.connectionID);
        let options = this.options;
        return new Promise((resolve, reject) => {
            options.applyDefaults();
            resolve(options);
        });
    }
    initializeWebTierRequestor() {
        return new Promise((resolve, fail) => {
            let formData = new FormData();
            formData.append("UserIdentifier", "feenr");
            formData.append("password", "install"); // number 123456 is immediately converted to a string "123456"
            this.traceServletRequest({
                method: "POST",
                excludeServlet: true,
                formData: formData
            })
                .then(() => { resolve(); })
                .catch((e) => { fail(e); });
        });
    }
    initializeTracerRequestor() {
        return new Promise((resolve, reject) => {
            this.traceServletRequest({})
                .then((res) => { resolve(res); })
                .catch((error) => { reject(error); });
        });
    }
    startConnection() {
        return new Promise((resolve, fail) => {
            let params = {};
            if (this.SESSION_TYPE == "RULEWATCH") {
                params = {
                    pzDebugRequest: "connect",
                    pzCommandSession: this.connectionID,
                    pzDebugConnection: this.connectionID,
                    pySessionType: this.SESSION_TYPE,
                    pyWatchInsKey: escape(this.pyWatchInsKey),
                    pyWatchClassName: escape(this.pyWatchClassName)
                };
            }
            else {
                params = {
                    pzDebugRequest: "connect",
                    pzCommandSession: this.connectionID,
                    pzDebugConnection: this.connectionID,
                    pySessionType: this.SESSION_TYPE
                };
            }
            this.traceServletRequest({ queryParams: params })
                .then((res) => { resolve(res); })
                .catch((e) => { fail(e); });
        });
    }
    startTrace() {
        return new Promise((resolve, fail) => {
            let query = {
                pzDebugRequest: "TraceApp",
                pzMaxEvents: this.maxEventsPerRequest,
                pzForceDisconnect: "Y",
                pzCommandSession: this.connectionID,
                pzDebugConnection: this.connectionID
            };
            this.traceServletRequest({ queryParams: query })
                .then((res) => { resolve(res); })
                .catch((e) => { fail(e); });
        });
    }
    postOptions() {
        let options = this.options;
        return new Promise((resolve, fail) => {
            let strPostData = options.getQueryFormData();
            let query = {};
            this.traceServletRequest({
                queryParams: query,
                method: "POST",
                formData: strPostData,
            })
                .then((res) => { resolve(res); })
                .catch((e) => { fail(e); });
        });
    }
    ;
    getTraceEvent(sequenceNumber) {
        this.traceServletRequest({
            queryParams: {
                pzDebugRequest: "getEvent",
                pzCommandSession: this.debugConnectionID,
                pzDebugConnection: this.connectionID,
                pzEvent: sequenceNumber
            }
        });
        return null;
    }
    requestTraceEvents() {
        return new Promise((resolve, fail) => {
            let params = {
                pzDebugRequest: "Trace",
                MaxEvents: "200",
                pzCommandSession: this.debugConnectionID,
                pzDebugConnection: this.connectionID,
                pzXmlOnly: "true",
                pzSessionType: this.SESSION_TYPE
            };
            this.traceServletRequest({ queryParams: params })
                .then((res) => {
                let data = res;
                let cmdStatus = utils_1.Utils.getNodeValue(data, "CmdStatus");
                if (cmdStatus.indexOf("error") >= 0) {
                    let cmdResponse = utils_1.Utils.getNodeValue(data, "CmdResponse");
                    let aMessage = "Please restart Tracer because " + cmdResponse;
                    fail(aMessage);
                    return;
                }
                let traceEventNodes = data.getElementsByTagName("TraceEventHeader");
                let eventsToAppend = [];
                for (let i = 0; i < traceEventNodes.length; i++) {
                    let node = traceEventNodes[i];
                    let traceEvent = new trace_event_1.TraceEvent();
                    traceEvent.sequenceNumber = utils_1.Utils.getNodeIntValue(node, "Sequence");
                    traceEvent.activityName = utils_1.Utils.getNodeValue(node, "ActivityName");
                    traceEvent.stepNumber = utils_1.Utils.getNodeValue(node, "StepNumber");
                    traceEvent.eventType = utils_1.Utils.getNodeValue(node, "EventType");
                    traceEvent.stepMethod = utils_1.Utils.getNodeValue(node, "StepMethod");
                    traceEvent.stepStatus = utils_1.Utils.getNodeValue(node, "StepStatus");
                    eventsToAppend.push(traceEvent);
                }
                resolve(eventsToAppend);
            })
                .catch((e) => { fail(e); });
        });
    }
    clear() {
        // send a request to server to reset activity counter.
        this.traceServletRequest({
            queryParams: {
                pzDebugRequest: "settings",
                pzSetCmd: "ResetCounter",
                pzDebugConnection: this.connectionID
            }
        });
    }
    disconnect(force) {
        let params = {
            pzDebugRequest: "disconnect",
            pzDebugConnection: this.connectionID,
            pzXmlOnly: "true"
        };
        if (force) {
            params["pzForceDisconnect"] = "Y";
        }
        this.traceServletRequest({
            queryParams: params
        });
    }
    getURL(queryParameters, excludeServlet) {
        let queryString = "";
        if (!queryParameters) {
            queryParameters = {};
        }
        queryParameters.pzNodeID = this.nodeId;
        if (queryParameters) {
            queryString = utils_1.Utils.getQueryString(queryParameters);
        }
        if (excludeServlet) {
            return this.serverUrl + queryString;
        }
        return this.serverUrl + this.servletUrl + queryString;
    }
    traceServletRequest(request) {
        let queryParams = request.queryParams;
        let url = this.getURL(queryParams, request.excludeServlet || false);
        let method = request.method || "GET";
        let body = request.body || request.formData || {};
        return new Promise((resolve, fail) => {
            const request = new XMLHttpRequest();
            request.open(method, url);
            request.setRequestHeader("authorization", "Basic " + btoa("feenr:install"));
            request.onload = () => {
                var response = request.responseText;
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(response, "text/xml");
                let status = "";
                let cmdStatusNode = xmlDoc.getElementsByTagName("CmdStatus")[0];
                if (cmdStatusNode) {
                    status = cmdStatusNode.textContent;
                }
                let serverResponse = "";
                let serverResponseNode = xmlDoc.getElementsByTagName("CmdResponse")[0];
                if (serverResponseNode) {
                    serverResponse = serverResponseNode.textContent;
                }
                // if(status == "success"){
                resolve(xmlDoc);
                // } else {
                //     fail(status+":"+serverResponse);
                // }
            };
            request.onerror = (e) => { fail(e); };
            request.send(body);
        });
    }
}
exports.EventsServicePega8 = EventsServicePega8;
//# sourceMappingURL=events-service-pega8.js.map