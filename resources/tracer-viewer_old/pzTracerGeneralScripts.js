pega.u.d.Tracer = new function() {
    var gMaxEventsPerRequest = 200;
    var traceEventArray = new Array();
    var traceDebugOptionArray = new Array();
    var objRequestorWnd = null;
    var objTraceOptionWnd = null;;
    var objBreakpointWnd = null;
    var objWatchVarWnd = null;
    var objClipboardWnd = null;
    var connectionID = "";
    var newConnectionID = "";
    var connectionID_bak = "";
    var debugConnectionID = "";
    var gpzConnID = "";
    var gStartNewTracer = false;
    var gDonotSendMoreDisconnect = false;
    var gEndOfAsyncTraceEventSent = false;
    var strRequestorURI = "/prweb/PRServlet/U-yNZqtOFC9OsUmmvav4hJCh27b0DUQjQhtBg6r2ihQ%5B*/!Tracer";
    var TRACE_TRACERSERVLET_V3 = "/prweb" + "/PRTraceServlet";
    var pyEventTypesList = "";
    var pyRuleSetsList = "";
    var pyPageNameList = "";
    var pySessionType = "STANDARD";
    var pyWatchInsKey = "RULE-OBJ-ACTIVITY DATA-FIND-RESULTS PYTRANSFORM #20140414T205717.451 GMT";
    var pyWatchClassName = "Rule-Obj-Activity";
    var gTracerInitialized = false;
    var tracerEnabled = false;
    var gTraceEventTableHTML;
    var filters = [];
    var eventsList = [];

    function initializeTracer(){
        if(!gTracerInitialized) {
            initializeTracerTreeScripts();
        }
        //gTraceEventTableHTML = document.getElementById("traceEvent-TABLE").outerHTML;
        // get the connection ID passed from the calling application.
        gDonotSendMoreDisconnect = false;
        connectionID = gConnectionID;
        gpzConnID = connectionID;

        if (connectionID == "") {
            alert("Connection ID is empty. Please restart Tracer.");
            gDonotSendMoreDisconnect = true;
            writeEventInfo("Please restart Tracer");
            //disconnectExit();
            return;
        }

        if (connectionID != null) {
            // If this is a  Backgorund tracer - (connectionID contains the string 'pzDebugBGConnection')
            // 1. The BGTracerkey is appended to the title
            // 2. Confirm dialog that is shown when this tracer window is closed
            var newTitle = "";
            var connectionSuffix = "pzDebugBGConnection";
            var dbgPos = connectionID.indexOf(connectionSuffix);
            if (dbgPos > 0) {
                newTitle = connectionID.substring(0,dbgPos);
                window.onbeforeunload = function() {
                    return "You cannot view again the tracer events of this asynchronous execution after you close this window" ;
                };
            }
            if(newTitle != "") {
                document.title = parent.document.title + " - " + newTitle;
            }
        }

        var postInit = function() {
            gStartNewTracer = false;

            $.ajax({
                url: TRACE_TRACERSERVLET_V3,
                success: function(data, textStatus, jqXHR){
                    startTraceEvent();
                },
                error: function(){
                    alert("Failed to start tracer. Please restart");
                },
                cache:false
            });
        }

        if(!gTracerInitialized) {
            initSettings(postInit); //init all settings including Options, Event Types, and RuleSets.

        } else {
            postInit();
        }

    }

    function startTraceEvent() {
        var strURL = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=connect&pzCommandSession=" + connectionID + "&pzDebugConnection=" + connectionID + "&pySessionType=" + pySessionType;

        // If this is a rules watch, send along the inskey
        if (pySessionType=="RULEWATCH") {
            strURL = strURL + "&pyWatchInsKey=" + escape(pyWatchInsKey) + "&pyWatchClassName=" + escape(pyWatchClassName);
        }

        $.ajax({
            url: strURL,
            success: function (data, textStatus, jqXHR) {
                makeTraceRequest(data, textStatus, jqXHR);
            },
            error: function () {
                alert("Issue loading: startTraceEvent");
            },
            cache: false
        });
    }

    function makeTraceRequest(data, textStatus, jqXHR) {
        var strLocation = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=TraceApp&pzMaxEvents="+gMaxEventsPerRequest+"&pzForceDisconnect=Y&pzCommandSession=" + connectionID + "&pzDebugConnection=" + connectionID;
        $.ajax({
            url: strLocation,
            success: function (data, textStatus, jqXHR) {
                letCheckOptions();
            },
            error: function () {
                alert("Issue loading: makeTraceRequest");
            },
            cache: false
        });

    }

    function letCheckOptions() {
        // This can be done with a safe URL rather than string concatenation.
        var strPostData;
        strPostData = "pzDebugRequest=settings&pzSetCmd=SetOptions";
        strPostData += "&pzOptTraceClassLoad=" + traceDebugOptionArray["nOptTraceClassLoad"];
        strPostData += "&pzOptTraceException=" + traceDebugOptionArray["nOptTraceException"];
        strPostData += "&pzOptTraceJContextBegin=" + traceDebugOptionArray["nOptTraceJContextBegin"];
        strPostData += "&pzOptTraceActivityBegin=" + traceDebugOptionArray["nOptTraceActivityBegin"];
        strPostData += "&pzOptTraceActivityEnd=" + traceDebugOptionArray["nOptTraceActivityEnd"];
        strPostData += "&pzOptTraceStepBegin=" + traceDebugOptionArray["nOptTraceStepBegin"];
        strPostData += "&pzOptTraceStepEnd=" + traceDebugOptionArray["nOptTraceStepEnd"];
        strPostData += "&pzOptTraceWhenBegin=" + traceDebugOptionArray["nOptTraceWhenBegin"];
        strPostData += "&pzOptTraceWhenEnd=" + traceDebugOptionArray["nOptTraceWhenEnd"];
        strPostData += "&pzOptTraceInputEditBegin=" + traceDebugOptionArray["nOptTraceInputEditBegin"];
        strPostData += "&pzOptTraceInputEditEnd=" + traceDebugOptionArray["nOptTraceInputEditEnd"];
        strPostData += "&pzOptTraceModelBegin=" + traceDebugOptionArray["nOptTraceModelBegin"];
        strPostData += "&pzOptTraceModelEnd=" + traceDebugOptionArray["nOptTraceModelEnd"];
        strPostData += "&pzOptExceptionBreak=" + traceDebugOptionArray["nOptExceptionBreak"];
        strPostData += "&pzOptStatusFailBreak=" + traceDebugOptionArray["nOptStatusFailBreak"];
        strPostData += "&pzOptStatusWarnBreak=" + traceDebugOptionArray["nOptStatusWarnBreak"];
        strPostData += "&pzOptTraceAccessDenied=" + traceDebugOptionArray["nOptTraceAccessDenied"];
        strPostData += "&pzOptExpandJavaPage=" + traceDebugOptionArray["nOptExpandJavaPage"];
        strPostData += "&pzOptAbbreviateEvents=" + traceDebugOptionArray["nOptAbbreviateEvents"];
        strPostData += "&pzOptCollectLocalVars=" + traceDebugOptionArray["nOptLocalVariables"];
        strPostData += pyEventTypesList;
        strPostData += pyRuleSetsList;
        strPostData += "&pzOptSetPageNames=" + pyPageNameList;
        strPostData += "&pzDebugConnection=" + connectionID;

        $.ajax({
            type: "POST",
            data: strPostData,
            url: TRACE_TRACERSERVLET_V3,
            cache: false,
            success: function(data, textStatus, jqXHR){
                tracerEnabled = true;
                if(gTracerInitialized){
                    autocontinue()
                } else {
                    gTracerInitialized = true;
                    mainTracerLoop();
                }
            },
            error: function(){}
        });
    }

    function mainTracerLoop(){
        if(tracerEnabled) {
            requestTraceEvents();
        }
    }

    function requestTraceEvents(){
        strURL = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=Trace&MaxEvents=200&pzCommandSession=" + debugConnectionID + "&pzDebugConnection=" + connectionID + "&pzXmlOnly=true";
        $.ajax({
            url: strURL,
            success: function(data, textStatus, jqXHR){
                parseTraceResponse(data);
            },
            error: function(){
                mainTracerLoop();
            },
            cache: false
        });
    }

    function parseTraceResponse(data){
        var cmdStatus = getNodeValue(data,"CmdStatus");
        if (cmdStatus.indexOf("error") >= 0) {
            var cmdResponse = getNodeValue(data,"CmdResponse");
            var aMessage =  "Please restart Tracer because " + cmdResponse;
            alert(aMessage);
            return;
        }
        var traceEventNodes = data.getElementsByTagName("TraceEventHeader");
        if(traceEventNodes.length==0){
            setTimeout(mainTracerLoop, 1000);
            return;
        }
        var eventsToAppend = new Array();
        for(var i=0; i<traceEventNodes.length; i++){
            //var traceEvent = getNodeValue(traceEventNodes[i]);
            var traceEvent = new TraceEvent(traceEventNodes[i]);
            eventsToAppend.push(traceEvent);
            traceEventArray[traceEvent.sequenceNumber]=traceEvent;
        }
        appendEvents(eventsToAppend);
        setTimeout(mainTracerLoop, 10);
    }

    function getNodeValue(data, nodeName){
        var matchingNode = data.getElementsByTagName(nodeName);
        if(matchingNode.length>0 && matchingNode[0]!= undefined) {
            return (matchingNode[0].textContent || matchingNode[0].text || "").trim();
        } else {
            return "";
        }
    }

    function appendEvents(eventArray){
        for(var i =0; i< eventArray.length; i++){
            var currentEvent = eventArray[i];
            if(currentEvent) {
                eventsList.push(currentEvent);
                for (var k = 0; k < filters.length; k++) {
                    if (!currentEvent.applyFilter(filters[k])) {
                        return;
                    }
                }
                if (currentEvent)
                    tracerTree.updateTreeWithEvent(currentEvent);
            }
        }
    }

    function initSettings(postInit) {
        //Define new variable to hold Tracer option setings from database instead of cookies (cookies are eliminated)
        strURL = "?pyActivity=Data-TRACERSettings.pzGetOptionsAsJSON";
        $.ajax({
            url:strURL,
            success:function(response){
                initSettingsCallback(response);
                postInit();
            },
            fail:function(){},
            cache: false
        })
    }

    function initSettingsCallback(response) {
        jo = JSON.parse(response);
        traceDebugOptionArray["nOptTraceClassLoad"] = "N";
        traceDebugOptionArray["nOptTraceException"] = jo.pyTraceException;
        traceDebugOptionArray["nOptTraceJContextBegin"] = jo.pyTraceJContextBegin;
        traceDebugOptionArray["nOptTraceActivityBegin"] = jo.pyTraceActivityBegin;
        traceDebugOptionArray["nOptTraceActivityEnd"] = jo.pyTraceActivityEnd;
        traceDebugOptionArray["nOptTraceStepBegin"] = jo.pyTraceStepBegin;
        traceDebugOptionArray["nOptTraceStepEnd"] = jo.pyTraceStepEnd;
        traceDebugOptionArray["nOptTraceWhenBegin"] = jo.pyTraceWhenBegin;
        traceDebugOptionArray["nOptTraceWhenEnd"] = jo.pyTraceWhenEnd;
        traceDebugOptionArray["nOptTraceInputEditBegin"] = jo.pyTraceInputEditBegin;
        traceDebugOptionArray["nOptTraceInputEditEnd"] = jo.pyTraceInputEditEnd;
        traceDebugOptionArray["nOptTraceModelBegin"] = jo.pyTraceModelBegin;
        traceDebugOptionArray["nOptTraceModelEnd"] = jo.pyTraceModelEnd;
        traceDebugOptionArray["nOptExceptionBreak"] = jo.pyExceptionBreak;
        traceDebugOptionArray["nOptStatusFailBreak"] = jo.pyStatusFailBreak;
        traceDebugOptionArray["nOptStatusWarnBreak"] = jo.pyStatusWarnBreak;
        traceDebugOptionArray["nOptTraceAccessDenied"] = jo.pyTraceAccessDenied;
        traceDebugOptionArray["nOptExpandJavaPage"] = jo.pyExpandJavaPage;
        traceDebugOptionArray["nOptAbbreviateEvents"] = jo.pyAbbreviateEvents;
        traceDebugOptionArray["nOptMaxTraceEventsDisplayed"] = jo.pyMaxTraceEventsDisplayed == "" ? 5000 : jo.pyMaxTraceEventsDisplayed;
        traceDebugOptionArray["nOptLocalVariables"] = jo.pyLocalVariables;
        for (var i in traceDebugOptionArray) {
            if(!traceDebugOptionArray[i]) {
                traceDebugOptionArray[i] = "N";
            }
        }
        var sValue = "";
        var nIndex = 0;

        pyEventTypesList = "";
        var eventTypes = jo.pyUserEventTypesList;
        var nPos = eventTypes.indexOf(";");
        while (nPos > 0)
        {
            var sName = eventTypes.substring(0, nPos);
            eventTypes = eventTypes.substring(nPos+1,eventTypes.length);
            nPos = sName.indexOf("/");
            if (nPos > 0)
            {
                sValue = sName.substring(nPos+1, nPos+2);
                sName = sName.substring(0, nPos);
                if (sValue == "Y" || sValue == "y") {
                    nIndex += 1;
                    pyEventTypesList += "&eventType" + nIndex + "=" + sName;
                }
            }
            else
                break;
            nPos = eventTypes.indexOf(";");
        }

        // init RuleSets
        nIndex = 0;
        pyRuleSetsList = "";
        var ruleSetList = jo.pxUserRuleSetList;
        nPos = ruleSetList.indexOf(";");
        while (nPos > 0) {
            sName = ruleSetList.substring(0, nPos);
            ruleSetList = ruleSetList.substring(nPos+1, ruleSetList.length);
            nPos = sName.indexOf(":");
            if (nPos > 0) {
                sValue = sName.substring(nPos+1, nPos+2);
                sName = sName.substring(0, nPos);
                if (sValue == "Y" || sValue == "y")
                {
                    nIndex += 1;
                    pyRuleSetsList += "&ruleSet" + nIndex + "=" + sName;
                }
            } else {
                break;
            }
            nPos = ruleSetList.indexOf(";");
        }
    }

    function closeTracer() {
        $("#traceEvent-TABLE").empty();
        closeAllWindows();

        if (gStartNewTracer) {
            //alert("closeTracer: gStartNewTracer: " + gStartNewTracer);
            gDonotSendMoreDisconnect = true; //This will help not to send a second disconnect request because
            // parent parent.document.location.replace(strURL) will call closeTracer()
            // again and will go to else branch and no need to send a second disconnect request.
            // disconnectExit() is only called when closing Tracer
            disconnect(true);
            gStartNewTracer = false;
            var strURL = strRequestorURI + "?pyActivity=Data-TRACERSettings.TracerOptionsAvailable&ConnectionID=" + newConnectionID;
            parent.document.location.replace(strURL);
        }
        else {
            if (!gDonotSendMoreDisconnect)
                disconnectExit();
        }
    }

    function closeAllWindows() {
        // close connection list window
        if (objRequestorWnd != null) {
            if (!objRequestorWnd.closed)
                objRequestorWnd.close();
        }
        // close option-settings window
        if (objTraceOptionWnd != null) {
            if (!objTraceOptionWnd.closed)
                objTraceOptionWnd.close();
        }
        // close breakpoint window
        if (objBreakpointWnd != null) {
            if (!objBreakpointWnd.closed)
                objBreakpointWnd.close();
        }
        // close WatchVar window
        if (objWatchVarWnd != null) {
            if (!objWatchVarWnd.closed)
                objWatchVarWnd.close();
        }
        // close clipbord window
        if (objClipboardWnd != null) {
            if (!objClipboardWnd.closed)
                objClipboardWnd.close();
        }
    }

    function disconnectExit() {
        var strURL;
        strURL = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=disconnect&pzForceDisconnect=Y&pzDebugConnection=" + (connectionID == "" ? connectionID_bak : connectionID) + "&pzXmlOnly=true";
        if(!gEndOfAsyncTraceEventSent) {
            //In the case of background tracer, by the time end of asyn tracer event is sent the session would have been deleted, so not required to destroy queue.
            strURL += "&pzDestroyQueue=true";
        }

        $.ajax({
            url: strURL,
            success :function(){}
        });
    }

    function disconnect(bForceDisconnect) {
        //writeSaneEventMessage("disconnect: sending disconnect");
        var strURL = "";
        var sOptionalForce= "";
        if(bForceDisconnect){
            var sOptionalForce = "&pzForceDisconnect=Y"
        }
        strURL = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=disconnect"+sOptionalForce+"&pzDebugConnection=" + connectionID + "&pzXmlOnly=true";

        $.ajax({
            url: strURL,
            success: function(){},
            error: function(){
                alert("Issue loading: disconnect")
            }
        });

    }

    function deleteTraceEvents(enabled) {
        document.getElementById("traceEvent-TABLE").outerHTML = gTraceEventTableHTML;
        // send a request to server to reset activity counter.
        var strRequest  = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=settings&pzSetCmd=ResetCounter" + "&pzDebugConnection=" + connectionID;
        $.ajax({
            url:strRequest,
            success:function(){},
            fail:function(){}
        });
    }

    function autocontinue() {
        /**
         $.ajax({
            type: "POST",
            url:TRACE_TRACERSERVLET_V3,
            success:function(){},
            fail:function(){},
            cache: false
        })**/
        var strURL = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=autocontinue&pzCommandSession=" + connectionID + "&pzDebugConnection=" + connectionID + "&pzXmlOnly=true";
        $.ajax({
            url:strURL,
            success:function(){requestTraceEvents();},
            fail:function(){},
            cache: false
        })
    }

    function stopStart(){
        if(tracerEnabled){
            tracerEnabled = false;
            document.getElementsByTagName("button")[0].innerHTML = document.getElementsByTagName("button")[0].innerHTML.replace("Pause","Play");
            disconnect();
        } else {
            tracerEnabled = true;
            document.getElementsByTagName("button")[0].innerHTML = document.getElementsByTagName("button")[0].innerHTML.replace("Play","Pause");
            initializeTracer();
        }
    }

    function launchSettings() {
        alert("Show settings dialog");
    }

    function launchBreakpoints() {
        alert("Show breakpoints dialog");
    }

    function launchRemoteTrace() {
        alert("Remote trace");
    }

    function exportTrace() {
        var jsonEvents = JSON.stringify(eventsList);
        var blob = new Blob([jsonEvents], {type: "application/json"});
        var url  = URL.createObjectURL(blob);
        window.open(url);
    }

    function retrieveFromServer(sequenceNumber) {

        var strUrl = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=getEvent&pzCommandSession=" + debugConnectionID + "&pzDebugConnection=" + (connectionID == "" ? connectionID_bak : connectionID) + "&pzEvent=" + sequenceNumber;
        $.ajax({
            type: "GET",
            url: strUrl,
            cache: false,
            success: function(response){
                debugger;
                var traceEvent = response.childNodes[0];
                var propPanelContent = document.createElement("div");
                var insName = traceEvent.getAttribute("insName");
                var rsName = traceEvent.getAttribute("rsName");
                buildNameValuePair(propPanelContent, "InsName", insName);
                buildNameValuePair(propPanelContent, "RulesetName", rsName);
                var displayProperties = ['DateTime', 'ThreadName', 'StepMethod', 'StepNumber', 'ParameterPageName', 'PrimaryPageName', 'pxMethodStatus'];
                for(var i = 0; i < traceEvent.childNodes.length; i++){
                    var currentNode = traceEvent.childNodes[i];
                    var propertyName = currentNode.tagName;
                    var propertyValue = currentNode.textContent;
                    if(displayProperties.indexOf(propertyName) >= 0 ) {
                        if(propertyName == 'ParameterPageName'){
                            buildNameValuePair(propPanelContent, propertyName, propertyValue);
                            var parameterList;
                            for(var k = 0; k < traceEvent.childNodes.length; k++){
                                if(traceEvent.childNodes[k].tagName == "ParameterPageContent"
                                    && traceEvent.childNodes[k].childNodes[0]
                                    && traceEvent.childNodes[k].childNodes[0].childNodes)
                                {
                                    parameterList = traceEvent.childNodes[k].childNodes[0].childNodes;
                                    propertyName = "ParameterPageContent";
                                    var parameterContainer = document.createElement("div");
                                    for(var j = 0; j < parameterList.length; j++ ){
                                        var parameterNode = parameterList[j];
                                        var parameterName = parameterNode.tagName;
                                        var parameterValue = parameterNode.textContent;
                                        parameterContainer.appendChild(buildNameValuePair(null, parameterName, parameterValue, true));
                                    }
                                    var parameterPage = buildNameValuePair(propPanelContent, propertyName, parameterContainer.innerHTML);
                                    parameterPage.className = "property-pair property-page";
                                    break;
                                }
                            }
                        } else  {
                            if (propertyName == "x"){
                                buildNameValuePair(propPanelContent, propertyName, propertyValue);
                            } else {
                                buildNameValuePair(propPanelContent, propertyName, propertyValue);
                            }
                        }
                    }
                }
                var launchButton = document.createElement("input");
                launchButton.type = "button";
                launchButton.value = "Open in new window";
                var propPanelContentHTML = propPanelContent.outerHTML;
                launchButton.addEventListener('click',function(){
                    var newWindow = window.open();
                    newWindow.document.body.innerHTML = propPanelContentHTML;
                })
                propPanelContent.appendChild(launchButton);
                $("#bottomright-panel").empty();
                $("#bottomright-panel").append(propPanelContent);
            },
            error: function(){}
        });
    }

    function getStepRowHtml(eventObj, sequenceNumber) {
        var sHtml = "";
        sHtml += "<tr>";
        sHtml += "<td class='whenEventName'>" + eventObj.eventName + "</td>";
        sHtml += "<td class='whenStepMethod'>" + eventObj.stepMethod + "</td>";
        sHtml += "<td class='whenStepStatus'>" + eventObj.mStepStatus + "</td>";
        sHtml += "<td style='width:70px' ><button type='button' onClick='pega.u.d.Tracer.retrieveFromServer(" + sequenceNumber +")' class='Strong pzhc' data-ctl=''><div class='pzbtn-rnd' data-click='.'><div class='pzbtn-lft' data-click='..'><div class='pzbtn-rgt' data-click='...'><div class='pzbtn-mid' data-click='....'><img src='webwb/zblankimage.gif' alt='' class='pzbtn-i'>Show<img alt='' src='webwb/zblankimage.gif' class='pzbtn-i'></div></div></div></div></button></td>";
        sHtml += "</tr>";
        return (sHtml);
    }

    function displayTraceEvent(eventList){

        var eventNumber = (eventList.indexOf(",")>=0) ? eventList.substring(0, eventList.indexOf(",")) : eventList;
        var eventListArray = eventList.split(",");
        var topHeight = "0px;"

        if (eventListArray.length > 1) {
            topHeight = "200px";
        }

        var rightPanelHtml = "<div id='topright-panel' style='height:" + topHeight + "; overflow:auto'></div>";
        rightPanelHtml += "<div id='bottomright-panel' style='height: 100%; overflow:auto'></div>";
        $("#property-panel").empty();
        $("#property-panel").append(rightPanelHtml);
        var prePostConditionHtml = "<table style='width:100%'>";
        prePostConditionHtml += "<tr><td class='whenEventNameHeader'>Event</td><td class='whenMethodHeader'>Method</td><td class='whenStatusHeader'>Status</td><td style='width:70px' class='whenExpandHeader'>Expand</td></tr>";
        if (eventListArray.length > 1) {
            for (var index=0; index < eventListArray.length; index++) {
                prePostConditionHtml += getStepRowHtml(getEventHeader(eventListArray[index]), eventListArray[index]);
            }
            prePostConditionHtml += "</table>";
            $("#topright-panel").empty();
            $("#topright-panel").append(prePostConditionHtml);
        } else {
            var strUrl = TRACE_TRACERSERVLET_V3 + "?pzDebugRequest=getEvent&pzCommandSession=" + debugConnectionID + "&pzDebugConnection=" + (connectionID == "" ? connectionID_bak : connectionID) + "&pzEvent=" + eventNumber;
            $.ajax({
                type: "GET",
                url: strUrl,
                cache: false,
                success: function(response){
                    var traceEvent = response.childNodes[0];
                    var propPanelContent = document.createElement("table");
                    propPanelContent.id = "property-panel";
                    var insName = traceEvent.getAttribute("insName");
                    var rsName = traceEvent.getAttribute("rsName");
                    buildNameValuePair(propPanelContent, "InsName", insName);
                    buildNameValuePair(propPanelContent, "RulesetName", rsName);
                    var displayProperties = ['DateTime', 'ThreadName', 'StepMethod', 'StepNumber', 'ParameterPageName', 'PrimaryPageName', 'pxMethodStatus'];
                    var parameterPageContentIndex = -1;
                    for(var i = 0; i < traceEvent.childNodes.length; i++) {
                        var currentNode = traceEvent.childNodes[i];
                        var propertyName = currentNode.tagName;
                        var propertyValue = currentNode.textContent;

                        if (displayProperties.indexOf(propertyName) >= 0) {
                            buildNameValuePair(propPanelContent, propertyName, propertyValue);
                        } else if (propertyName=="ParameterPageContent"){
                            parameterPageContentIndex = i;
                        }
                    }
                    if(parameterPageContentIndex>=0){
                        var k = parameterPageContentIndex;
                        if (traceEvent.childNodes[k].childNodes[0] && traceEvent.childNodes[k].childNodes[0].childNodes) {
                            var parameterList = traceEvent.childNodes[k].childNodes[0].childNodes;
                            var parameterContainer = document.createElement("table");
                            parameterContainer.className = "property-page";
                            var paramHeader = $("<tr><td colspan='2' class='property-name' style='text-align: center'>Parameters</td></tr>")[0];
                            parameterContainer.appendChild(paramHeader);
                            for (var j = 0; j < parameterList.length; j++) {
                                var parameterName = parameterList[j].tagName;
                                var parameterValue = parameterList[j].textContent;
                                buildNameValuePair(parameterContainer, parameterName, parameterValue, true);
                            }
                            var paramRow = document.createElement("tr");
                            var paramColumn = document.createElement("td");
                            paramColumn.setAttribute("colspan","2");
                            paramColumn.appendChild(parameterContainer);
                            paramRow.appendChild(paramColumn);
                            propPanelContent.appendChild(paramRow);
                        }
                    }

                    $("#bottomright-panel").empty();
                    $("#bottomright-panel").append(propPanelContent);
                },
                error: function(){}
            });

        }


    }

    function buildNameValuePair(container, propertyName, propertyValue, includeBlank){
        if (includeBlank || propertyValue && propertyValue.trim() != "") {
            if(propertyValue.trim() == ""){
                propertyValue = "&nbsp;";
            }
            var propertyPairEl = document.createElement("tr");
            var propertyNameEl = document.createElement("td");
            propertyNameEl.className = "property-name";
            var propertyValueEl = document.createElement("td");
            propertyValueEl.className = "property-value";
            propertyNameEl.innerHTML = propertyName;
            propertyValueEl.innerHTML = propertyValue;
            propertyPairEl.appendChild(propertyNameEl);
            propertyPairEl.appendChild(propertyValueEl);
            if(container) {
                container.appendChild(propertyPairEl);
            }
            return propertyPairEl;
        }
    }

    function getEventHeader(eventNumber){
        if(traceEventArray[eventNumber]) {
            return traceEventArray[eventNumber];
        } else {
            return -1;
        }
    }

    //public functions
    this.stopStart = function () {
        stopStart();
    }
    this.clear = function () {
        deleteTraceEvents();
    };
    this.launchSettings = function () {
        launchSettings();
    };
    this.launchBreakpoints = function () {
        launchBreakpoints();
    };
    this.launchWatch = function () {
        launchWatch();
    };
    this.launchRemoteTrace = function () {
        launchRemoteTrace();
    };
    this.exportTrace = function () {
        exportTrace();
    }
    this.initializeTracer = function () {
        initializeTracer();
    }
    this.closeTracer = function(){
        closeTracer();
    }
    this.displayTraceEvent = function(eventNumber){
        displayTraceEvent(eventNumber);
    }
    this.getEventHeader = function(eventNumber){
        return getEventHeader(eventNumber);
    }
    this.retrieveFromServer = function(sequenceNumber) {
        return retrieveFromServer(sequenceNumber);
    }

}();

pega.u.d.Tracer.Filter = function(field, operator, value){
    var field;
    var operator;
    var value;
    var id;
    function getField(){
        return field;
    }
    function getOperator(){
        return operator;
    }
    function getValue(){
        return value;
    }
    function getID(){
        return id;
    }
    this.getField = function(){
        getField();
    }
    this.getOperator = function(){
        getOperator();
    }
    this.getValue = function(){
        getValue();
    }
    this.getID = function(){
        getID();
    }
}
pega.u.d.Tracer.Filter.prototype.fields = {
    THREAD : 0,
    RULESET: 1,
    RULESETVERSION : 2,
    PAGENAME : 3
}
pega.u.d.Tracer.Filter.prototype.operators = {
    EQUAL : 0,
    CONTAINS: 1
}

window.onbeforeunload = function(){pega.u.d.Tracer.closeTracer();};
if(!window.attachEvent){
    window.attachEvent = function(eventType, callback){
        $(window).on(eventType, callback)
    };
}
if(!window.document.attachEvent){
    window.document.attachEvent = function(eventType, callback){
        $(window.document).on(eventType, callback)
    };
}
pega.u.d.attachOnload(pega.u.d.Tracer.initializeTracer);