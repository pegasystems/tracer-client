import {Options} from './options'
import {Utils} from './utils'
import {TraceEvent} from "./trace-event";
import {EventsService} from "./events-service"
import {Page} from "./page";

export class EventsServicePega8 implements EventsService {
    sequenceNumber: number;
    connectionID: string;
    debugConnectionID: string;
    nodeId: string;
    hostName: string;
    options: Options;
    gTracerInitialized: boolean;
    maxEventsPerRequest: number;
    pyWatchInsKey: string;
    pyWatchClassName: string;
    serverUrl: string;
    servletUrl: string;
    SESSION_TYPE: string;

    constructor(aConnectionID: string, aNodeId?: string) {
        this.connectionID = aConnectionID;
        this.debugConnectionID = aConnectionID;
        this.nodeId = aNodeId || "";
        this.hostName = "";
        this.options = null;
        this.gTracerInitialized = false;
        this.maxEventsPerRequest = 200;
        this.sequenceNumber = 0;
        this.pyWatchInsKey = "";
        this.pyWatchClassName = "";
        this.serverUrl = "/prweb";
        this.serverUrl = "/prweb";
        this.servletUrl = "/PRTraceServlet";
        this.SESSION_TYPE = "STANDARD";
    }

    connect(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
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
            } else {
                resolve()
            }
        });
    }

    private getSettings(): Promise<Options> {
        this.options = new Options(this.connectionID);
        let options = this.options;
        return new Promise((resolve, reject) => {
            options.applyDefaults();
            resolve(options);
        });
    }

    private initializeWebTierRequestor(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
            let formData = new FormData();
            formData.append("UserIdentifier", "feenr");
            formData.append("password", "install"); // number 123456 is immediately converted to a string "123456"
            this.traceServletRequest({
                method: "POST",
                excludeServlet: true,
                formData: formData
            })
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    fail(e)
                })
        });
    }

    private initializeTracerRequestor(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.traceServletRequest({})
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }

    private startConnection(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
            let params = {};
            if (this.SESSION_TYPE == "RULEWATCH") {
                params = {
                    pzDebugRequest: "connect",
                    pzCommandSession: this.connectionID,
                    pzDebugConnection: this.connectionID,
                    pySessionType: this.SESSION_TYPE,
                    pyWatchInsKey: escape(this.pyWatchInsKey),
                    pyWatchClassName: escape(this.pyWatchClassName)
                }
            } else {
                params = {
                    pzDebugRequest: "connect",
                    pzCommandSession: this.connectionID,
                    pzDebugConnection: this.connectionID,
                    pySessionType: this.SESSION_TYPE
                }
            }
            this.traceServletRequest({queryParams: params})
                .then((res) => {
                    resolve(res)
                })
                .catch((e) => {
                    fail(e)
                });
        });
    }

    private startTrace(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
            let query = {
                pzDebugRequest: "TraceApp",
                pzMaxEvents: this.maxEventsPerRequest,
                pzForceDisconnect: "Y",
                pzCommandSession: this.connectionID,
                pzDebugConnection: this.connectionID
            }
            this.traceServletRequest({queryParams: query})
                .then((res) => {
                    resolve(res)
                })
                .catch((e) => {
                    fail(e)
                });
        });
    }

    postOptions(): Promise<any> {
        let options = this.options;
        return new Promise<any>((resolve, fail) => {
            let strPostData = options.getQueryFormData();
            let query = {};
            this.traceServletRequest({
                queryParams: query,
                method: "POST",
                formData: strPostData,
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((e) => {
                    fail(e)
                });
        });
    };

    getTraceEvent(sequenceNumber: number): Promise<TraceEvent> {
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

    requestTraceEvents(): Promise<any> {
        return new Promise<any>((resolve, fail) => {
            let params = {
                pzDebugRequest: "Trace",
                MaxEvents: "200",
                pzCommandSession: this.debugConnectionID,
                pzDebugConnection: this.connectionID,
                pzXmlOnly: "true",
                pzSessionType: this.SESSION_TYPE
            };

            this.traceServletRequest({queryParams: params})
                .then((res) => {
                    let data = res;
                    let cmdStatus = Utils.getNodeStringValue(data, "CmdStatus");
                    if (cmdStatus.indexOf("error") >= 0) {
                        let cmdResponse = Utils.getNodeStringValue(data, "CmdResponse");
                        let aMessage = "Please restart Tracer because " + cmdResponse;
                        fail(aMessage);
                        return;
                    }


                    let traceEventNodes = data.getElementsByTagName("TraceEventHeader");
                    let eventsToAppend = [];
                    for (let i = 0; i < traceEventNodes.length; i++) {
                        let eventNode = traceEventNodes[i];
                        let event = new TraceEvent();


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

                        let elapsedTime = parseFloat(Utils.getNodeStringValue(eventNode, "Elapsed")) / 1000;

                        if (elapsedTime) {
                            event.alertLabel = elapsedTime.toString();
                        }

                        eventsToAppend.push(event);

                        this.sequenceNumber++;

                    }


                    resolve(eventsToAppend);
                })
                .catch((e) => {
                    fail(e);
                });
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

    disconnect(force: boolean) {
        let params: any = {
            pzDebugRequest: "disconnect",
            pzDebugConnection: this.connectionID,
            pzXmlOnly: "true"
        };
        if (force) {
            params["pzForceDisconnect"] = "Y"
        }
        this.traceServletRequest({
            queryParams: params
        });
    }

    private getURL(queryParameters?: any, excludeServlet?: boolean) {
        let queryString = "";
        if (!queryParameters) {
            queryParameters = {};
        }
        queryParameters.pzNodeID = this.nodeId;
        if (queryParameters) {
            queryString = Utils.getQueryString(queryParameters)
        }
        if (excludeServlet) {
            return this.serverUrl + queryString;
        }
        return this.serverUrl + this.servletUrl + queryString;
    }

    private traceServletRequest(request: any): Promise<Document> {
        let queryParams = request.queryParams;
        let url = this.getURL(queryParams, request.excludeServlet || false);
        let method = request.method || "GET";
        let body = request.body || request.formData || {};

        return new Promise<Document>((resolve, fail) => {
            const request = new XMLHttpRequest();
            request.open(method, url);
            request.setRequestHeader("authorization", "Basic " + btoa("feenr:install"));
            request.onload = () => {
                var response = request.responseText;
                let parser = new DOMParser();
                let xmlDoc: Document = parser.parseFromString(response, "text/xml");

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
            request.onerror = (e) => {
                fail(e);
            };
            request.send(body);
        });
    }

    getPageContent(eventNumber: number, pageName: string): Promise<Page> {
        return new Promise<Page>((resolve, reject) => {
            this.traceServletRequest({
                method: "GET",
                excludeServlet: false,
                queryParams: {
                    pzDebugRequest: "getEvent",
                    pzEvent: "%20" + eventNumber + "%20",
                    pzCommandSession: this.debugConnectionID,
                    pzDebugConnection: this.connectionID,
                    pzNodeID: this.nodeId,
                    pzTraceEventNodeID: this.nodeId,
                    pySessionType: this.SESSION_TYPE,
                }
            })
                .then((xmlDoc) => {
                    let page:Page = new Page(pageName,xmlDoc.getElementsByTagName("pagedata")[0].outerHTML);
                    resolve(page)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }
}
