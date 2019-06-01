import {Options} from './options'
import {Utils} from './utils'
import {StandardCallback} from "./standard-callback";
import {TraceEvent} from "./trace-event";

export class EventsService {

    connectionID: string;
    debugConnectionID: string;
    nodeId: string;
    hostName: string;
    options: Options;
    gTracerInitialized: boolean;
    connectCallbackObj: StandardCallback;
    maxEventsPerRequest: number;
    pyWatchInsKey: string;
    pyWatchClassName: string;
    serverUrl: string;
    servletUrl: string;
    SESSION_TYPE: string;

    username: string;
    password: string;
    cookie: string;

    constructor(aConnectionID: string, aHostName?: string, aNodeId?: string){
        this.connectionID= aConnectionID;
        this.debugConnectionID = aConnectionID;
        this.nodeId = aNodeId || "662295838901f81008580ba98984fb2e";
        this.hostName = aHostName || "";
        this.options = null;
        this.gTracerInitialized = false;
        this.connectCallbackObj = null;
        this.maxEventsPerRequest = 200;
        this.pyWatchInsKey = "";
        this.pyWatchClassName = "";
        //this.serverUrl = "http://localhost:8080/http://lu-83-cam.eng.pega.com/prweb";
        this.serverUrl = "/prweb";
        this.serverUrl = "/prweb";
        this.servletUrl = "/PRTraceServlet";
        this.SESSION_TYPE = "STANDARD";
    }

    connect(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
            if(!this.gTracerInitialized) {
            this.getSettings()
                // .then(()=>{
                //     return this.initializeWebTierRequestor();
                // })
                .then((res)=>{
                    return this.initializeTracerRequestor();
                })
                .then(() => {
                    return this.startConnection();
                })
                .then(()=>{
                    return this.startTrace();
                })
                .then(()=>{
                    return this.postOptions();
                })
                .then(()=>{
                    resolve();
                })
                .catch((e)=>{
                    console.log("Something went wrong: "+ e);
                });
        } else {
            resolve()
        }
        });
    }

    getSettings(): Promise<Options> {
        this.options = new Options(this.connectionID);
        let options=  this.options;
        return new Promise((resolve,reject) => {
            options.applyDefaults();
            resolve(options);
        });
    }

    initializeWebTierRequestor(): Promise<any> {
        return new Promise<any>((resolve, fail)=>{
            let formData = new FormData();
            formData.append("UserIdentifier", "feenr");
            formData.append("password", "install"); // number 123456 is immediately converted to a string "123456"
            this.traceServletRequest({
                method: "POST",
                excludeServlet: true,
                formData: formData
            })
                .then(()=>{resolve()})
                .catch((e)=>{fail(e)})
        });
    }

    initializeTracerRequestor(): Promise<any> {
        return new Promise<any>((resolve, reject)=>{
            this.traceServletRequest({})
                .then((res)=>{resolve(res)})
                .catch((error)=>{reject(error)});
        });
    }

    startConnection(): Promise<any> {
        return new Promise<any>((resolve, fail)=>{
            let params = {};
            if (this.SESSION_TYPE=="RULEWATCH"){
                params = {
                    pzDebugRequest : "connect",
                    pzCommandSession : this.connectionID,
                    pzDebugConnection : this.connectionID,
                    pySessionType : this.SESSION_TYPE,
                    pyWatchInsKey : escape(this.pyWatchInsKey),
                    pyWatchClassName : escape(this.pyWatchClassName)
                }
            } else {
                params = {
                    pzDebugRequest : "connect",
                    pzCommandSession : this.connectionID,
                    pzDebugConnection : this.connectionID,
                    pySessionType : this.SESSION_TYPE
                }
            }
            this.traceServletRequest({queryParams: params})
                .then((res)=>{resolve(res)})
                .catch((e)=>{fail(e)});
        });
    }

    startTrace(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
            let query = {
                pzDebugRequest : "TraceApp",
                pzMaxEvents : this.maxEventsPerRequest,
                pzForceDisconnect : "Y",
                pzCommandSession : this.connectionID,
                pzDebugConnection : this.connectionID
            }
            this.traceServletRequest({ queryParams: query})
                .then((res)=>{resolve(res)})
                .catch((e)=>{fail(e)});
        });
    }

    postOptions(): Promise<any> {
        let options = this.options;
        return new Promise<any>((resolve, fail)=>{
            let strPostData = options.getQueryFormData();
            let query = {

            };
            this.traceServletRequest({
                queryParams: query,
                method: "POST",
                formData: strPostData,
            })
                .then((res)=>{resolve(res)})
                .catch((e)=>{fail(e)});
        });
    };

    getTraceEvent(sequenceNumber: number){
        this.traceServletRequest({
            queryParams: {
                pzDebugRequest : "getEvent",
                pzCommandSession : this.debugConnectionID,
                pzDebugConnection : this.connectionID,
                pzEvent : sequenceNumber
            }
        });
    }

    requestTraceEvents(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
            let params = {
                pzDebugRequest : "Trace",
                    MaxEvents : "200",
                    pzCommandSession : this.debugConnectionID,
                    pzDebugConnection : this.connectionID,
                    pzXmlOnly : "true",
                    pzSessionType : this.SESSION_TYPE
            };

            this.traceServletRequest({queryParams: params})
                .then((res)=>{
                    let data = res;
                    let cmdStatus = Utils.getNodeValue(data,"CmdStatus");
                    if (cmdStatus.indexOf("error") >= 0) {
                        let cmdResponse = Utils.getNodeValue(data,"CmdResponse");
                        let aMessage =  "Please restart Tracer because " + cmdResponse;
                        fail(aMessage);
                        return;
                    }
                    let traceEventNodes = data.getElementsByTagName("TraceEventHeader");
                    console.log("traceEventNodes length"+ traceEventNodes);
                    let eventsToAppend = [];
                    for(let i=0; i<traceEventNodes.length; i++){
                        let traceEvent = new TraceEvent();
                        eventsToAppend.push(traceEvent);
                        //this.traceEventArray[traceEvent.sequenceNumber]=traceEvent;
                    }
                    resolve(eventsToAppend);
                })
                .catch((e)=>{fail(e);});
        });
    }

    clear(){
        // send a request to server to reset activity counter.
        this.traceServletRequest({
            queryParams: {
                pzDebugRequest : "settings",
                pzSetCmd : "ResetCounter",
                pzDebugConnection : this.connectionID
            }
        });
    }

    disconnect(force:boolean){
        let params: any = {
            pzDebugRequest : "disconnect",
            pzDebugConnection : this.connectionID,
            pzXmlOnly : "true"
        };
        if(force){
            params["pzForceDisconnect"] = "Y"
        }
        this.traceServletRequest({
            queryParams: params
        });
    }

    getURL(queryParameters?: any, excludeServlet?:boolean){
        let queryString = "";
        if(!queryParameters){
            queryParameters = {};
        }
        queryParameters.pzNodeID = this.nodeId;
        if(queryParameters){
            queryString = Utils.getQueryString(queryParameters)
        }
        if(excludeServlet){
            return this.serverUrl + queryString;
        }
        return this.serverUrl + this.servletUrl + queryString;
    }

    traceServletRequest(request: any): Promise<Document>{
        let queryParams = request.queryParams;
        let url = this.getURL(queryParams, request.excludeServlet || false);
        let method =  request.method || "GET";
        let body = request.body || request.formData || {};

        return new Promise<Document>((resolve, fail)=>{
            const request = new XMLHttpRequest();
//            const username = this.username;
//            const password = this.password;
            request.open(method, url);
//            request.setRequestHeader("Cookie", cookie);
            request.setRequestHeader("authorization", "Basic " + btoa("feenr:install"));
            request.onload = () => {
                var response = request.responseText;
                let parser = new DOMParser();
                let xmlDoc:Document = parser.parseFromString(response,"text/xml");

                let status = "";
                let cmdStatusNode = xmlDoc.getElementsByTagName("CmdStatus")[0];
                if(cmdStatusNode) {
                    status = cmdStatusNode.textContent;
                }
                let serverResponse = "";
                let serverResponseNode = xmlDoc.getElementsByTagName("CmdResponse")[0];
                if(serverResponseNode){
                    serverResponse = serverResponseNode.textContent;
                }

                // if(status == "success"){
                    resolve(xmlDoc);
                // } else {
                //     fail(status+":"+serverResponse);
                // }
            };
            request.onerror = (e)=>{fail(e);};
            request.send(body);
        });
    }
}