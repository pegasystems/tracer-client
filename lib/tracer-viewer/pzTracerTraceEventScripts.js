function TraceEvent(traceEventNode){
    this.activityNumber= "";
    this.activityName= "";
    this.alertLabel= "";
    this.DBTData= "";
    this.eventKey= "";
    this.eventName= "";
    this.eventNode= "";
    this.eventType= "";
    this.adpTracerKey= "";
    this.adpTracerRackKey= "";
    this.adpLoadPageName= "";
    this.adpQueueEvent= false;
    this.aaQueueEvent= false;
    this.hasMessages= false;
    this.interaction= "";
    this.threadname= "";
    this.interactionBytes= "";
    this.interactionQueryParam= "";
    this.stepStatus = "";
    this.stepMethod= "";
    this.stepNumber= "";
    this.primaryPageName= "";
    this.sInsKey= null;
    this.sKeyName= null;
    this.sRSName= null;
    this.sRSVersion= null;
    this.timeStamp= "";
    this.sequenceNumber = "";
    this.endSequenceNumber = "";
    this.childEvents = [];
    this.parentEvent = {};
    this.parseNode(traceEventNode);
    return this;
}

TraceEvent.prototype.parseNode = function(traceEventNode){
    var getNodeValue = function(data, nodeName){
        var matchingNode = data.getElementsByTagName(nodeName);
        if(matchingNode.length>0 && matchingNode[0]!= undefined) {
            return (matchingNode[0].textContent || matchingNode[0].text || "").trim();
        } else {
            return "";
        }
    }
    this.activityNumber = getNodeValue(traceEventNode,  "ActivityNumber");
    this.activityName = getNodeValue(traceEventNode, "ActivityName");
    this.primaryPageName = getNodeValue(traceEventNode, "PrimaryPageName");
    this.primaryPageName = this.primaryPageName!="" ? this.primaryPageName : getNodeValue(traceEventNode, "DBTTableName");
    this.hasMessages = getNodeValue(traceEventNode, "pzStatus").indexOf("false") ? true : false;
    this.threadName = getNodeValue(traceEventNode, "ThreadName");
    this.insKey = getNodeValue(traceEventNode, "inskey");
    this.keyName = traceEventNode.getAttribute("keyname");
    this.rulesetName = traceEventNode.getAttribute("rsname")||"";
    this.rulesetVersion = traceEventNode.getAttribute("rsvers")||"";
    this.eventKey = getNodeValue(traceEventNode, "EventKey") || getNodeValue(traceEventNode, "InstanceName"); //todo
    this.eventType = getNodeValue(traceEventNode, "EventType");
    this.adpTracerKey = getNodeValue(traceEventNode, "BGTracerKey");
    this.adpTracerRackKey = getNodeValue(traceEventNode, "BGTracerRackKey");
    this.adpLoadPageName = getNodeValue(traceEventNode, "ADPLoadPageName");
    this.adpQueueEvent = getNodeValue(traceEventNode, "ADPQueueEvent")==="true";
    this.aaQueueEvent = getNodeValue(traceEventNode, "AsynchronousActivityQueueEvent")==="true";
    this.eventName = getNodeValue(traceEventNode, "EventName");
    this.endOfAsyncTraceEventSent = this.eventName ==="AsyncTracerEnd";
    this.timeStamp = getNodeValue(traceEventNode, "Elapsed").length == 0 ? "0.000" : (new Number(getNodeValue(traceEventNode, "Elapsed"))/1000).toFixed(4);
    this.stepStatus = getNodeValue(traceEventNode, "mStepStatus")!="" ? getNodeValue(traceEventNode, "mStepStatus") : getNodeValue(traceEventNode, "WhenStatus");
    this.stepMethod = getNodeValue(traceEventNode, "StepMethod");
    this.stepNumber = getNodeValue(traceEventNode, "StepNumber");
    this.breakStatus = getNodeValue(traceEventNode, "Break"); //todo
    this.interactionBytes = getNodeValue(traceEventNode, "InteractionBytes");
    this.interactionQueryParam = getNodeValue(traceEventNode, "InteractionQueryParam");
    this.sequenceNumber = getNodeValue(traceEventNode, "Sequence");
    this.stepMethod = getNodeValue(traceEventNode, "DBTSQLOperation") !="" ? getNodeValue(traceEventNode, "DBTSQLOperation") : this.stepMethod;
    this.databaseTableData = getNodeValue(traceEventNode, "DBTNote");
    this.databaseTableData = this.databaseTableData != "" ? this.databaseTableData : this.databaseTableData = getNodeValue(traceEventNode, "DBTHighLevelOp");
    this.stepStatus = this.stepStatus!= "" ? this.stepStatus : getNodeValue(traceEventNode, "DBTSize");
    this.alertLabel = getNodeValue(traceEventNode, "AlertLabel");
    this.eventType = this.eventType == "Interaction" ? this.eventName : this.eventType;

    var eventTypeIndex = this.eventType.indexOf(" ");
    if (eventTypeIndex <0){
        eventTypeIndex = this.eventType.length;
    }
    this.eventTypeCategory = this.eventType.substring(0, eventTypeIndex);
    this.eventTypeState = this.eventType.substring(eventTypeIndex+1);
}


TraceEvent.prototype.eventTypeOverrides = {
    "Activity" : function(eventRow, traceEvent){
    },

    "Interaction" : function(eventRow, traceEvent){
        eventRow.children[traceEvent.rowIDs.STEP_STATUS].innerText = traceEvent.interactionBytes + "(b)";
    },
    "When" : function(){
    }
}

TraceEvent.prototype.getTreeNode = function(){
    var hrefTarget = this.sequenceNumber - 3;
    var ruleName = "";
    var ruleClass = "";
    var ruleKey = this.keyName;
    var treeNode = document.createElement("a");
    if(hrefTarget < 0){
        hrefTarget = 0;
    }
    if(ruleKey && ruleKey!=""){
        ruleName = ruleKey.substring(ruleKey.indexOf(" "));
        ruleClass = ruleKey.substring(0, ruleKey.indexOf(" "));
    }
    treeNode.setAttribute("href", "#" + hrefTarget);
    treeNode.setAttribute("sequenceNumber", this.sequenceNumber);
    treeNode.setAttribute("class","trace-event-node "+this.toCSSClass(this.eventTypeCategory, "event type"));
    switch(this.eventTypeCategory) {
        case this.eventTypes.INTERACTION :
            //treeNode.className = "TracerTreeNode";
            var InteractionSpan = document.createElement("span");
            InteractionSpan.className = "treeRuleName";
            InteractionSpan.textContent = "Interaction";
            treeNode.appendChild(InteractionSpan);
            break;
        case this.eventTypes.STEP :
            var treeTypeSpan = document.createElement("span");
            treeTypeSpan.className = "stepLabel";
            treeTypeSpan.textContent = "Step "+this.stepNumber;
            treeNode.appendChild(treeTypeSpan);
            var treeTypeSpan = document.createElement("span");
            treeTypeSpan.className = "stepMethod";
            treeTypeSpan.textContent = this.stepMethod;
            treeNode.appendChild(treeTypeSpan);
            var treeTypeSpan = document.createElement("span");
            treeTypeSpan.className = "stepLabelHideJump";
            treeTypeSpan.textContent = "Jump";
            treeNode.appendChild(treeTypeSpan);
            break;
        case this.eventTypes.WHEN :
            if(this.parentEvent.eventTypeCategory == "Step"){
                this.parentEvent.childEvents.push(this);
                break;
            }
        default:
            var treeTypeSpan = document.createElement("span");
            treeTypeSpan.className = "tree" + this.eventTypeCategory + "Tag";
            treeTypeSpan.textContent = this.eventTypeCategory+" ";
            treeNode.appendChild(treeTypeSpan);
            var treeClassSpan = document.createElement("span");
            treeClassSpan.className = "treeRuleClass";
            treeClassSpan.textContent = ruleClass;
            treeNode.appendChild(treeClassSpan);
            var treeNameSpan = document.createElement("span");
            treeNameSpan.className = "treeRuleName";
            treeNameSpan.textContent = ruleName;
            treeNode.appendChild(treeNameSpan);
    }
    return treeNode;
}

TraceEvent.prototype.closeTreeNode = function(treeNode){
    statusClass = this.toCSSClass(this.stepStatus, "status")
    if(statusClass != "") {
        treeNode.addClass(statusClass);
    }
    switch(this.eventTypeCategory) {
        case this.eventTypes.INTERACTION :
            break;
        case this.eventTypes.STEP :
            break;
        default:
    }
}

TraceEvent.prototype.applyFilter = function(filter){
    var filterResult = true;
    var field = filter.getField();
    var operator = filter.getOperator();
    var value = filter.getValue();
    var targetValue = "";
    switch (field){
        case filter.fields.THREAD:
            targetValue = this.threadname;
            break;
        case filter.fields.RULESET:
            targetValue = this.rulesetName;
            break;
        case filter.fields.RULESETVERSION:
            targetValue = this.rulesetVersion;
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

TraceEvent.prototype.toCSSClass = function(text, prefix){
    if(prefix && prefix != ""){
        text = prefix+"-"+text;
    }
    text = text.replace(" ","-");
    text = text.toLowerCase();
    return text;
}

TraceEvent.prototype.eventTypes = {
    INTERACTION : "Interaction",
    STEP : "Step",
    STREAM : "Stream",
    DATATRANSFORM : "Data Transform",
    ACTIVITY : "Activity",
    WHEN: "When"
}