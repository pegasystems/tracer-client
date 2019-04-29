// Options = require('./options');
// Utils = require('./utils');
// $ = require('jquery');
import {Options} from './options'
import {Utils} from './utils'

export class EventsService {

    connectionID: string;
    debugConnectionID: string;
    nodeId: string;
    hostName: string;
    options: Options;
    gTracerInitialized: boolean;
    connectCallbackObj: any;
    maxEventsPerRequest: number;
    pyWatchInsKey: string;
    pyWatchClassName: string;
    servletUrl: string;
    SESSION_TYPE: string;
    utils: Utils = new Utils();

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
        this.servletUrl = "/prweb/PRTraceServlet";
        this.SESSION_TYPE = "STANDARD";
    }

    connect(callbacks: object){
        this.connectCallbackObj = callbacks;
        if(!this.gTracerInitialized) {
            this.initSettings(callbacks);
        } else {
            this.connectCallbackObj.success();
        }
    }

    initSettings(callbacks: object) {
        let strURL = this.getURL({
            pyActivity : "Data-TRACERSettings.pzGetOptionsAsJSON"
        }, true);
        this.xmlHttpRequest({
            url:strURL,
            success:function(response: any){
                this.options = new Options(this.connectionID);
                try {
                    this.options.parseValuesFromJSON(response);
                } catch (exception){
                    this.options.applyDefaults();
                }
                //nodeId = options.getOption("nOptNodeId");
                this.setConnection(this.options.getOption("nOptConnectionId"));
                //connectionId = options.getOption("nOptConnectionId");
                this.connect2(callbacks);
            },
            fail:function(){
                this.options = new Options(this.connectionID);
                this.options.applyDefaults();
                this.connect2(callbacks);
            },
            cache: false
        })
    }

    connect2(callbacks: any){
        this.xmlHttpRequest({
            url: this.getURL(),
            success: function(data: any, textStatus: string, jqXHR: any){
                this.connect3(callbacks);
            },
            error: callbacks.error,
            cache:false
        });
    }

    connect3(callbacks: any) {
        let strURL = "";
        if (this.SESSION_TYPE=="RULEWATCH"){
            strURL = this.getURL({
                pzDebugRequest : "connect",
                pzCommandSession : this.connectionID,
                pzDebugConnection : this.connectionID,
                pySessionType : this.SESSION_TYPE,
                pyWatchInsKey : escape(this.pyWatchInsKey),
                pyWatchClassName : escape(this.pyWatchClassName)
            })
        } else {
            strURL = this.getURL({
                pzDebugRequest : "connect",
                pzCommandSession : this.connectionID,
                pzDebugConnection : this.connectionID,
                pySessionType : this.SESSION_TYPE
            })
        }

        this.xmlHttpRequest({
            url: strURL,
            success: function (data: any, textStatus: string, jqXHR: any) {
                this.connect4(callbacks);
            },
            error: callbacks.error,
            cache: false
        });
    }

    connect4(callbacks: any) {
        let strURL = this.getURL({
            pzDebugRequest : "TraceApp",
            pzMaxEvents : this.maxEventsPerRequest,
            pzForceDisconnect : "Y",
            pzCommandSession : this.connectionID,
            pzDebugConnection : this.connectionID
        });
        this.xmlHttpRequest({
            url: strURL,
            success: function () {
                this.postOptions(callbacks);
            },
            error: callbacks.error,
            cache: false
        });

    }

    postOptions(callbacks: any) {
        let strPostData = this.options.getQueryString();
        this.xmlHttpRequest({
            type: "POST",
            data: strPostData,
            url: this.servletUrl,
            cache: false,
            success: function(){
                this.gTracerInitialized = true;
                callbacks.success();
            },
            error: callbacks.error
        });
    }

    getTraceEvent(sequenceNumber: number){
        let strURL = this.getURL({
            pzDebugRequest : "getEvent",
            pzCommandSession : this.debugConnectionID,
            pzDebugConnection : this.connectionID,
            pzEvent : sequenceNumber
        });
        this.xmlHttpRequest({
            type: "GET",
            url: strURL,
            cache: false,
            success: function(){},
            error: function(){}
        });
    }

    // No idea what this does...
    displayTraceEvent(eventNumber: number){
        let strURL = this.getURL({
            pzDebugRequest : "getEvent",
            pzCommandSession : "",
            pzDebugConnection : this.connectionID,
            pzEvent : eventNumber
        });
        this.xmlHttpRequest({
            type: "GET",
            url: strURL,
            cache: false,
            success: function(response: any){
                let traceEvent = response.childNodes[0];
            },
            error: function(){}
        });
    }

    autocontinue() {
        let strURL = this.getURL({
            pzDebugRequest : "autocontinue",
            pzCommandSession : this.connectionID,
            pzDebugConnection : this.connectionID,
            pzXmlOnly : "true"
        });
        this.xmlHttpRequest({
            url:strURL,
            success:function(){this.requestTraceEvents();},
            fail:function(){},
            cache: false
        })
    }

    requestTraceEvents(callbacks: any){
        let strURL = this.getURL({
            pzDebugRequest : "Trace",
            MaxEvents : "200",
            pzCommandSession : this.debugConnectionID,
            pzDebugConnection : this.connectionID,
            pzXmlOnly : "true"
        });

        this.xmlHttpRequest({
            url: strURL,
            success: function(data: any, textStatus: string, jqXHR: any){
                let cmdStatus = this.utils.getNodeValue(data,"CmdStatus");
                if (cmdStatus.indexOf("error") >= 0) {
                    let cmdResponse = this.utils.getNodeValue(data,"CmdResponse");
                    let aMessage =  "Please restart Tracer because " + cmdResponse;
                    callbacks.error(aMessage);
                    return;
                }
                let traceEventNodes = data.getElementsByTagName("TraceEventHeader");
                let eventsToAppend = [];
                for(let i=0; i<traceEventNodes.length; i++){
                    let traceEvent = new TraceEvent(traceEventNodes[i]);
                    eventsToAppend.push(traceEvent);
                    this.traceEventArray[traceEvent.sequenceNumber]=traceEvent;
                }
                callbacks.success(eventsToAppend);
            },
            error: function(){
                callbacks.error("Error");
            },
            cache: false
        });
    }

    setOptions(){

    }

    clear(){
        // send a request to server to reset activity counter.
        let strURL  = this.getURL({
            pzDebugRequest : "settings",
            pzSetCmd : "ResetCounter",
            pzDebugConnection : this.connectionID
        });
        this.xmlHttpRequest({
            url:strURL,
            success:function(){},
            fail:function(){}
        });
    }

    disconnect(force:boolean){
        let strURL = this.getURL({
            pzDebugRequest : "disconnect",
            pzDebugConnection : this.connectionID,
            pzXmlOnly : "true"
        });
        if(force){
            strURL += "&pzForceDisconnect=Y"
        }
        this.xmlHttpRequest({
            url: strURL,
            success: function(){},
            error: function(){}
        });
    }

    getURL(queryParameters?: Object, excludeServlet?:boolean){
        let queryString = "";
        if(queryParameters){
            queryString = this.utils.getQueryString(queryParameters)
        }
        if(excludeServlet){
            return queryString;
        }
        return this.servletUrl + queryString;
    }

    xmlHttpRequest(request: any){
        // perform request
    }

    injectDependencies(){

    }

    getConnectionList(callbacks: any){
        let strURL = this.getURL({
            pzDebugRequest : "GetConnectionList",
            pzXmlOnly : "true",
            pzNodeID : this.nodeId
        });

        this.xmlHttpRequest({
            url: strURL,
            success: function(){
                callbacks.success();
            },
            error: callbacks.error
        });
    }

    setConnection(aConnectionID: string){
        this.connectionID = aConnectionID;
        this.debugConnectionID = aConnectionID;
    }
}