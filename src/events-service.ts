import {Options} from './options'
import {Utils} from './utils'
import {StandardCallback} from "./standard-callback";

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

    constructor(aConnectionID: string, aHostName?: string, aNodeId?: string){
        this.connectionID= aConnectionID;
        this.debugConnectionID = aConnectionID;
        this.nodeId = aNodeId || "";
        this.hostName = aHostName || "";
        this.options = null;
        this.gTracerInitialized = false;
        this.connectCallbackObj = null;
        this.maxEventsPerRequest = 200;
        this.pyWatchInsKey = "";
        this.pyWatchClassName = "";
        this.serverUrl = "http://localhost:1080/prweb";
        this.servletUrl = "/PRTraceServlet";
        this.SESSION_TYPE = "STANDARD";
    }

    connect(callbacks: StandardCallback){
        this.connectCallbackObj = callbacks;
        if(!this.gTracerInitialized) {
            //this.initSettings(callbacks);
            this.getSettings()
                .then((res)=>{
                    return this.initializeRequestor();
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
                .catch(()=>{
                    console.log("Something went wrong");
                })
        } else {
            this.connectCallbackObj.success();
        }
    }

    getSettings(): Promise<Options> {
        return new Promise((resolve,reject) => {
            let options = new Options(this.connectionID);
            options.applyDefaults();
            resolve(options);
        });
    }

    initializeRequestor(): Promise<any> {
        return new Promise<any>((resolve, reject)=>{
            this.traceServletRequest({
                url: this.getURL(),
                success: (data: any, textStatus: string, jqXHR: any) => {
                    resolve()
                },
                error: ()=>{reject()}
            });
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
            this.traceServletRequest({
                queryParams: params,
                success: (data: any, textStatus: string, jqXHR: any) => {
                    resolve()
                },
                error: ()=>{fail()}
            });
        });
    }

    startTrace(): Promise<any>{
        return new Promise<any>((resolve, fail)=>{
            this.traceServletRequest({
                queryParams: {
                    pzDebugRequest : "TraceApp",
                    pzMaxEvents : this.maxEventsPerRequest,
                    pzForceDisconnect : "Y",
                    pzCommandSession : this.connectionID,
                    pzDebugConnection : this.connectionID
                },
                success: () => {resolve()},
                error: ()=>{fail()}
            });
        });
    }

    postOptions(): Promise<any> {
        return new Promise<any>((resolve, fail)=>{
            let strPostData = this.options.getQueryString();
            this.traceServletRequest({
                method: "POST",
                data: strPostData,
                success: ()=>{resolve()},
                error: ()=>{fail()},
            });
        });
    };

    getTraceEvent(sequenceNumber: number){
        this.traceServletRequest({
            queryParams: {
                pzDebugRequest : "getEvent",
                pzCommandSession : this.debugConnectionID,
                pzDebugConnection : this.connectionID,
                pzEvent : sequenceNumber
            },
            success: ()=>{},
            error: ()=>{},
        });
    }

    requestTraceEvents(callbacks: StandardCallback){
        this.traceServletRequest({
            queryParams: {
                pzDebugRequest : "Trace",
                MaxEvents : "200",
                pzCommandSession : this.debugConnectionID,
                pzDebugConnection : this.connectionID,
                pzXmlOnly : "true"
            },
            success: (data: any, textStatus: string, jqXHR: any) => {
                let cmdStatus = Utils.getNodeValue(data,"CmdStatus");
                if (cmdStatus.indexOf("error") >= 0) {
                    let cmdResponse = Utils.getNodeValue(data,"CmdResponse");
                    let aMessage =  "Please restart Tracer because " + cmdResponse;
                    callbacks.fail(aMessage);
                    return;
                }
                let traceEventNodes = data.getElementsByTagName("TraceEventHeader");
                let eventsToAppend = [];
                for(let i=0; i<traceEventNodes.length; i++){
                    let traceEvent = new TraceEvent(traceEventNodes[i]);
                    eventsToAppend.push(traceEvent);
                    //this.traceEventArray[traceEvent.sequenceNumber]=traceEvent;
                }
                callbacks.success(eventsToAppend);
            },
            error: function(){
                callbacks.fail("Error");
            }
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
            queryParams: params,
            success: function(){},
            fail: function(){}
        });
    }

    getURL(queryParameters?: Object, excludeServlet?:boolean){
        let queryString = "";
        if(queryParameters){
            queryString = Utils.getQueryString(queryParameters)
        }
        if(excludeServlet){
            return this.serverUrl + queryString;
        }
        return this.serverUrl + this.servletUrl + queryString;
    }

    traceServletRequest(request: any): Promise<any>{
        let queryParams = request.queryParams;
        let url = this.getURL(queryParams, false);
        let method =  request.method || "GET";
        let body = request.body;

        return new Promise<any>((resolve, fail)=>{
            // perform request
            const request = new XMLHttpRequest();

            request.onload = function(e) {
                var response = request.responseText;
                resolve(response);
            };
            request.open(method, url);
            request.send();
        });
    }
}