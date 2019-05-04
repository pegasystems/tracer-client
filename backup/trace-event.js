module.exports = function(traceEventNode){
  var publicAPI = {
    activityNumber : "",
    activityName : "",
    alertLabel : "",
    DBTData: "",
    eventKey: "",
    eventName: "",
    eventNode: "",
    eventType: "",
    adpTracerKey: "",
    adpTracerRackKey: "",
    adpLoadPageName: "",
    adpQueueEvent: false,
    aaQueueEvent: false,
    hasMessages: false,
    interaction: "",
    threadname: "",
    interactionBytes: "",
    interactionQueryParam: "",
    stepStatus: "",
    stepMethod: "",
    stepNumber: "",
    primaryPageName: "",
    sInsKey: null,
    sKeyName: null,
    sRSName: null,
    sRSVersion: null,
    timeStamp: "",
    sequenceNumber: "",
    endSequenceNumber: "",
    childEvents: [],
    parentEvent: {},
    eventTypes : {
      INTERACTION : "Interaction",
      STEP : "Step",
      STREAM : "Stream",
      DATATRANSFORM : "Data Transform",
      ACTIVITY : "Activity",
      WHEN: "When"
    },
    eventTypeOverrides : {
      "Activity" : function(eventRow, traceEvent){
      },

      "Interaction" : function(eventRow, traceEvent){
        eventRow.children[traceEvent.rowIDs.STEP_STATUS].innerText = traceEvent.interactionBytes + "(b)";
      },
      "When" : function(){
      }
    }
  }

  function parseNode(traceEventNode){
    var getNodeValue = function(nodeName){
      var matchingNode = traceEventNode.getElementsByTagName(nodeName);
      if(matchingNode.length>0 && matchingNode[0]!= undefined) {
        return (matchingNode[0].textContent || matchingNode[0].text || "").trim();
      } else {
        return "";
      }
    }

    publicAPI.activityNumber = getNodeValue( "ActivityNumber");
    publicAPI.activityName = getNodeValue("ActivityName");
    publicAPI.primaryPageName = getNodeValue("PrimaryPageName");
    publicAPI.primaryPageName = publicAPI.primaryPageName!="" ? publicAPI.primaryPageName : getNodeValue("DBTTableName");
    publicAPI.hasMessages = getNodeValue("pzStatus").indexOf("false") ? true : false;
    publicAPI.threadName = getNodeValue("ThreadName");
    publicAPI.insKey = getNodeValue("inskey");
    publicAPI.keyName = traceEventNode.getAttribute("keyname");
    publicAPI.rulesetName = traceEventNode.getAttribute("rsname")||"";
    publicAPI.rulesetVersion = traceEventNode.getAttribute("rsvers")||"";
    publicAPI.eventKey = getNodeValue("EventKey") || getNodeValue("InstanceName"); //todo
    publicAPI.eventType = getNodeValue("EventType");
    publicAPI.adpTracerKey = getNodeValue("BGTracerKey");
    publicAPI.adpTracerRackKey = getNodeValue("BGTracerRackKey");
    publicAPI.adpLoadPageName = getNodeValue("ADPLoadPageName");
    publicAPI.adpQueueEvent = getNodeValue("ADPQueueEvent")==="true";
    publicAPI.aaQueueEvent = getNodeValue("AsynchronousActivityQueueEvent")==="true";
    publicAPI.eventName = getNodeValue("EventName");
    publicAPI.endOfAsyncTraceEventSent = publicAPI.eventName ==="AsyncTracerEnd";
    publicAPI.timeStamp = getNodeValue("Elapsed").length == 0 ? "0.000" : (new Number(getNodeValue("Elapsed"))/1000).toFixed(4);
    publicAPI.stepStatus = getNodeValue("mStepStatus")!="" ? getNodeValue("mStepStatus") : getNodeValue("WhenStatus");
    publicAPI.stepMethod = getNodeValue("StepMethod");
    publicAPI.stepNumber = getNodeValue("StepNumber");
    publicAPI.breakStatus = getNodeValue("Break"); //todo
    publicAPI.interactionBytes = getNodeValue("InteractionBytes");
    publicAPI.interactionQueryParam = getNodeValue("InteractionQueryParam");
    publicAPI.sequenceNumber = getNodeValue("Sequence");
    publicAPI.stepMethod = getNodeValue("DBTSQLOperation") !="" ? getNodeValue("DBTSQLOperation") : publicAPI.stepMethod;
    publicAPI.databaseTableData = getNodeValue("DBTNote");
    publicAPI.databaseTableData = publicAPI.databaseTableData != "" ? publicAPI.databaseTableData : publicAPI.databaseTableData = getNodeValue("DBTHighLevelOp");
    publicAPI.stepStatus = publicAPI.stepStatus!= "" ? publicAPI.stepStatus : getNodeValue("DBTSize");
    publicAPI.alertLabel = getNodeValue("AlertLabel");
    publicAPI.eventType = publicAPI.eventType == "Interaction" ? publicAPI.eventName : publicAPI.eventType;

    var eventTypeIndex = publicAPI.eventType.indexOf(" ");
    if (eventTypeIndex <0){
      eventTypeIndex = publicAPI.eventType.length;
    }
    publicAPI.eventTypeCategory = publicAPI.eventType.substring(0, eventTypeIndex);
    publicAPI.eventTypeState = publicAPI.eventType.substring(eventTypeIndex+1);
  }

  function applyFilter(filter){
    var filterResult = true;
    var field = filter.getField();
    var operator = filter.getOperator();
    var value = filter.getValue();
    var targetValue = "";
    switch (field){
      case filter.fields.THREAD:
        targetValue = publicAPI.threadname;
        break;
      case filter.fields.RULESET:
        targetValue = publicAPI.rulesetName;
        break;
      case filter.fields.RULESETVERSION:
        targetValue = publicAPI.rulesetVersion;
      default :
        break;
    }
    switch (operator){
      case filter.operators.EQUAL:
        filterResult = targetValue == value;
        break;
      case filter.operators.CONTAINS:
        filterResult = value.indexOf(targetValue)>0;
        break;
      default:
        filterResult = true;
    }
    return filterResult;
  }
  if(traceEventNode){
    parseNode(traceEventNode);
  }
  publicAPI.parseNode = parseNode;
  publicAPI.applyFilter = applyFilter;
  /**
  publicAPI.FIELDS = {
    ACTIVITY_NUMBER : "ActivityNumber",
    ACTIVITY_NAME : "ActivityName",
    PRIMARY_PAGE_NAME : "PrimaryPageName",
    THREAD_NAME : "ThreadName",
    INS_KEY : "inskey",
    KEY_NAME : "keyname",
    RULESET_NAME : "rsname",
    RULESET_VERSION : "rsvers",
    EVENT_KEY : "EventKey", //todo
    EVENT_TYPE : "EventType",
    ADP_TRACER_KEY : "BGTracerKey",
    ADP_TRACER_RACK_KEY : "BGTracerRackKey",
    ADP_LOAD_PAGE_NAME : "ADPLoadPageName",
    ADP_QUEUE_EVENT : "ADPQueueEvent"==="true",
    AA_QUEUE_EVENT : "AsynchronousActivityQueueEvent",
    EVENT_NAME : "EventName",
    END_OF_ASYNC_TRACE_EVENT_SENT : "AsyncTracerEnd",
    TIME_STAMP : "Elapsed",
    STEP_STATUS : "mStepStatus",
    STEP_METHOD : "StepMethod",
    STEP_NUMBER : "StepNumber",
    BREAK_STATUS : "Break",
    INTERACTION_BYTES : "InteractionBytes",
    INTERACTION_QUERY_PARAM : "InteractionQueryParam",
    sequenceNumber : "Sequence",
    stepMethod : "DBTSQLOperation" !="" ? "DBTSQLOperation" : publicAPI.stepMethod,
    databaseTableData : "DBTNote",
    databaseTableData : publicAPI.databaseTableData != "" ? publicAPI.databaseTableData : publicAPI.databaseTableData = "DBTHighLevelOp",
    stepStatus : publicAPI.stepStatus!= "" ? publicAPI.stepStatus : "DBTSize",
    alertLabel : "AlertLabel",
    eventType : publicAPI.eventType == "Interaction" ? publicAPI.eventName : publicAPI.eventType;
  }
   **/
  return publicAPI;
}



