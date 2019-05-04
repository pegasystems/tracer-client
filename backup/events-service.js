module.exports = function(aConnectionID, aHostName, aNodeId){
  let Options = require('./options');
  let Utils = require('./utils');
  let $ = require('jquery');
  let connectionID = aConnectionID;
  let debugConnectionID = connectionID;
  let nodeId = aNodeId | "";
  let hostName = aHostName | "";
  let options = null;
  let gTracerInitialized = false;
  let connectCallbackObj = null;
  let maxEventsPerRequest = 200;
  let pyWatchInsKey = "";
  let pyWatchClassName = "";
  const servletUrl = "/prweb/PRTraceServlet";
  const SESSION_TYPE = "STANDARD";


  function connect(callbacks){
    connectCallbackObj = callbacks;
    if(!gTracerInitialized) {
      initSettings(callbacks);
    } else {
      connectCallbackObj.success();
    }
  }

  function initSettings(callbacks) {
    strURL = getURL({
      pyActivity : "Data-TRACERSettings.pzGetOptionsAsJSON"
    }, true);
    $.ajax({
      url:strURL,
      success:function(response){
        options = new Options(connectionID);
        try {
          options.parseValuesFromJSON(response);
        } catch (exception){
          options.applyDefaults();
        }
        //nodeId = options.getOption("nOptNodeId");
        setConnection(options.getOption("nOptConnectionId"));
        //connectionId = options.getOption("nOptConnectionId");
        connect2(callbacks);
      },
      fail:function(){
        options = new Options(connectionID);
        options.applyDefaults();
        connect2(callbacks);
      },
      cache: false
    })
  }

  function connect2(callbacks){
    $.ajax({
      url: getURL(),
      success: function(data, textStatus, jqXHR){
        connect3(callbacks);
      },
      error: callbacks.error,
      cache:false
    });
  }

  function connect3(callbacks) {
    var strURL = "";
    if (SESSION_TYPE=="RULEWATCH"){
      strURL = getURL({
        pzDebugRequest : "connect",
        pzCommandSession : connectionID,
        pzDebugConnection : connectionID,
        pySessionType : SESSION_TYPE,
        pyWatchInsKey : escape(pyWatchInsKey),
        pyWatchClassName : escape(pyWatchClassName)
      })
    } else {
      strURL = getURL({
        pzDebugRequest : "connect",
        pzCommandSession : connectionID,
        pzDebugConnection : connectionID,
        pySessionType : SESSION_TYPE
      })
    }

    $.ajax({
      url: strURL,
      success: function (data, textStatus, jqXHR) {
        connect4(callbacks);
      },
      error: callbacks.error,
      cache: false
    });
  }

  function connect4(callbacks) {
    var strURL = getURL({
      pzDebugRequest : "TraceApp",
      pzMaxEvents : maxEventsPerRequest,
      pzForceDisconnect : "Y",
      pzCommandSession : connectionID,
      pzDebugConnection : connectionID
    });
    $.ajax({
      url: strURL,
      success: function () {
        postOptions(callbacks);
      },
      error: callbacks.error,
      cache: false
    });

  }

  function postOptions(callbacks) {
    var strPostData = options.getQueryString();
    $.ajax({
      type: "POST",
      data: strPostData,
      url: servletUrl,
      cache: false,
      success: function(){
        gTracerInitialized = true;
        callbacks.success();
      },
      error: callbacks.error
    });
  }

  function getTraceEvent(){
    var strURL = getURL({
      pzDebugRequest : "getEvent",
      pzCommandSession : debugConnectionID,
      pzDebugConnection : connectionID,
      pzEvent : sequenceNumber
    });
    $.ajax({
      type: "GET",
      url: strURL,
      cache: false,
      success: function(response){},
      error: function(){}
    });
  }

  // No idea what this does...
  function displayTraceEvent(){
    var strURL = getURL({
      pzDebugRequest : "getEvent",
      pzCommandSession : "",
      pzDebugConnection : connectionID,
      pzEvent : eventNumber
    });
    $.ajax({
      type: "GET",
      url: strURL,
      cache: false,
      success: function(response){
        var traceEvent = response.childNodes[0];
      },
      error: function(){}
    });
  }

  function autocontinue() {
    var strURL = getURL({
      pzDebugRequest : "autocontinue",
      pzCommandSession : connectionID,
      pzDebugConnection : connectionID,
      pzXmlOnly : "true"
    });
    $.ajax({
      url:strURL,
      success:function(){requestTraceEvents();},
      fail:function(){},
      cache: false
    })
  }

  function requestTraceEvents(callbacks){
    var strURL = getURL({
      pzDebugRequest : "Trace",
      MaxEvents : "200",
      pzCommandSession : debugConnectionID,
      pzDebugConnection : connectionID,
      pzXmlOnly : "true"
    });
    $.ajax({
      url: strURL,
      success: function(data, textStatus, jqXHR){
        var cmdStatus = Utils.getNodeValue(data,"CmdStatus");
        if (cmdStatus.indexOf("error") >= 0) {
          var cmdResponse = Utils.getNodeValue(data,"CmdResponse");
          var aMessage =  "Please restart Tracer because " + cmdResponse;
          callbacks.error(aMessage);
          return;
        }
        var traceEventNodes = data.getElementsByTagName("TraceEventHeader");
        var eventsToAppend = [];
        for(var i=0; i<traceEventNodes.length; i++){
          var traceEvent = new TraceEvent(traceEventNodes[i]);
          eventsToAppend.push(traceEvent);
          traceEventArray[traceEvent.sequenceNumber]=traceEvent;
        }
        callbacks.success(eventsToAppend);
      },
      error: function(){
        callbacks.error(aMessage);
      },
      cache: false
    });
  }

  function setOptions(){

  }

  function clear(){
    // send a request to server to reset activity counter.
    var strURL  = getURL({
      pzDebugRequest : "settings",
      pzSetCmd : "ResetCounter",
      pzDebugConnection : connectionID
    });
    $.ajax({
      url:strURL,
      success:function(){},
      fail:function(){}
    });
  }

  function disconnect(force){
    strURL = getURL({
      pzDebugRequest : "disconnect",
      pzDebugConnection : connectionID,
      pzXmlOnly : "true"
    });
    if(force){
      strURL += "&pzForceDisconnect=Y"
    }
    $.ajax({
      url: strURL,
      success: function(){},
      error: function(){}
    });
  }

  function getURL(queryParameters, excludeServlet){
    let queryString = "";
    if(queryParameters){
      queryString = Utils.getQueryString(queryParameters)
    }
    if(excludeServlet){
      return queryString;
    }
    return servletUrl + queryString;
  }


  function injectDependencies(){

  }

  function getConnectionList(callbacks){
    strURL = getURL({
      pzDebugRequest : "GetConnectionList",
      pzXmlOnly : "true",
      pzNodeID : nodeId
    });

    $.ajax({
      url: strURL,
      success: function(){
        callbacks.success
      },
      error: callbacks.error
    });
  }

  function setConnection(aConnectionID){
    connectionID = aConnectionID;
    debugConnectionID = connectionID;
  }

  let publicAPI = {};
  publicAPI._injectDependencies = injectDependencies;
  publicAPI.connect = connect;
  publicAPI.getConnectionList = getConnectionList;
  publicAPI.setConnection = setConnection;
  publicAPI.clear = clear;
  publicAPI.getTraceEvents = requestTraceEvents;
  publicAPI.getTraceEvent = getTraceEvent;
  publicAPI.setOptions = setOptions;
  publicAPI.disconnect = disconnect;
  return publicAPI;
}